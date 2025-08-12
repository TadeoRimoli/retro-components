"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"

type AccordionType = "single" | "multiple"

export interface AccordionRetroProps {
  /** single: solo un panel abierto | multiple: varios a la vez */
  type?: AccordionType
  /** índices abiertos por defecto */
  defaultOpenIndices?: number[]
  /** clase extra para el contenedor */
  className?: string
  /** items declarativos; también podés usar <AccordionItemRetro> como children */
  items?: { title: React.ReactNode; content: React.ReactNode; disabled?: boolean }[]
  /** slots para customizar estilos sin perder el look retro */
  slots?: {
    container?: string
    item?: string
    header?: string
    title?: string
    chevron?: string
    panel?: string
  }
  children?: React.ReactNode
}

export function Accordion({
  type = "multiple",
  defaultOpenIndices = [],
  className = "",
  items,
  slots,
  children,
}: AccordionRetroProps) {
  const childrenItems = useMemo(() => {
    if (!children) return []
    return React.Children.toArray(children).filter(Boolean) as React.ReactElement[]
  }, [children])

  const derivedItems =
    items?.map((it, idx) => (
      <AccordionItemRetro key={idx} title={it.title} defaultOpen={defaultOpenIndices.includes(idx)} disabled={it.disabled} slots={slots}>
        {it.content}
      </AccordionItemRetro>
    )) ?? childrenItems

  // Estado controlado para "single": cerramos otros al abrir uno
  const [openMap, setOpenMap] = useState<Record<number, boolean>>(() => {
    const m: Record<number, boolean> = {}
    defaultOpenIndices.forEach((i) => (m[i] = true))
    return m
  })

  const handleToggle = (i: number, next: boolean) => {
    setOpenMap((prev) => {
      if (type === "single") {
        const n: Record<number, boolean> = {}
        n[i] = next
        return n
      }
      return { ...prev, [i]: next }
    })
  }

  return (
    <div
      className={[
        // marco retro
        "rounded-xl border-2 border-[#D5D7E1] bg-white",
        "shadow-[inset_0_0_16px_rgba(0,0,0,0.06),0_10px_24px_rgba(0,0,0,0.08)]",
        "divide-y-2 divide-[#E6E8F0]",
        slots?.container ?? "",
        className,
      ].join(" ")}
      role="presentation"
    >
      {derivedItems.map((child, i) =>
        React.cloneElement(child as React.ReactElement<any>, {
          index: i,
          open: !!openMap[i],
          onToggle: (next: boolean) => handleToggle(i, next),
          slots,
        })
      )}
    </div>
  )
}

export interface AccordionItemRetroProps {
  title: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
  disabled?: boolean
  /** inyectado por AccordionRetro */
  index?: number
  open?: boolean
  onToggle?: (open: boolean) => void
  slots?: AccordionRetroProps["slots"]
}

export function AccordionItemRetro({
  title,
  children,
  defaultOpen = false,
  disabled = false,
  index,
  open: controlledOpen,
  onToggle,
  slots,
}: AccordionItemRetroProps) {
  const isControlled = typeof controlledOpen === "boolean"
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const open = isControlled ? controlledOpen! : uncontrolledOpen

  const toggle = () => {
    if (disabled) return
    if (isControlled) onToggle?.(!open)
    else setUncontrolledOpen((v) => !v)
  }

  const headerId = `acc-header-${index}`
  const panelId = `acc-panel-${index}`

  return (
    <div className={["bg-white", slots?.item ?? ""].join(" ")}>
      <button
        id={headerId}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggle}
        disabled={disabled}
        className={[
        "w-full px-5 py-4 text-left flex items-center justify-between gap-3",
        "bg-[linear-gradient(180deg,#E8ECF7_0%,#FFFFFF_100%)]",
        "hover:bg-[linear-gradient(180deg,#E3E8F9_0%,#FFFFFF_100%)]",
        "active:translate-y-[0.5px]",
        "focus:outline-none", // quitamos el ring de Tailwind
        "focus:shadow-[inset_0_0_6px_rgba(0,0,0,0.25),0_0_6px_2px_rgba(0,200,255,0.6)]", // glow retro
        disabled ? "opacity-60 cursor-not-allowed" : "",
        slots?.header ?? "",
      ].join(" ")}
      >
        <span
          className={[
            "font-semibold text-[#243055] select-none",
            "drop-shadow-[0_1px_0_rgba(255,255,255,0.7)]",
            slots?.title ?? "",
          ].join(" ")}
        >
          {title}
        </span>

        {/* Chevron retro */}
        <span
          aria-hidden
          className={[
            "shrink-0 h-6 w-6 grid place-items-center rounded-md border border-[#D5D7E1]",
            "bg-[linear-gradient(180deg,#FFFFFF_0%,#E9EEFF_100%)]",
            "shadow-[inset_0_-2px_6px_rgba(255,255,255,0.6),0_2px_6px_rgba(0,0,0,0.08)]",
            "transition-transform duration-300",
            open ? "rotate-180" : "",
            slots?.chevron ?? "",
          ].join(" ")}
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4 text-[#243055]">
            <path d="M6 8l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      <SmoothCollapse id={panelId} labelledBy={headerId} open={open} className={slots?.panel}>
        {/* Panel cromado suave */}
        <div
          className={[
            "px-5 py-4",
            "bg-white",
            "shadow-[inset_0_0_10px_rgba(0,0,0,0.04)]",
          ].join(" ")}
        >
          {children}
        </div>
      </SmoothCollapse>
    </div>
  )
}

/** Colapsado suave con animación de max-height + opacity + translate */
function SmoothCollapse({
  open,
  children,
  id,
  labelledBy,
  className,
  durationMs = 260,
}: {
  open: boolean
  children: React.ReactNode
  id?: string
  labelledBy?: string
  className?: string
  durationMs?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [maxH, setMaxH] = useState(0)
  const [rendered, setRendered] = useState(open)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (open) {
      setRendered(true)
      requestAnimationFrame(() => {
        setMaxH(el.scrollHeight)
      })
    } else {
      // iniciar desde altura actual y colapsar a 0
      setMaxH(el.scrollHeight)
      requestAnimationFrame(() => setMaxH(0))
      const t = setTimeout(() => setRendered(false), durationMs)
      return () => clearTimeout(t)
    }
  }, [open, durationMs])

  // Si el contenido cambia de tamaño estando abierto, actualizar altura
  useEffect(() => {
    if (!open) return
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(() => setMaxH(el.scrollHeight))
    ro.observe(el)
    return () => ro.disconnect()
  }, [open])

  return (
    <div
      id={id}
      role="region"
      aria-labelledby={labelledBy}
      aria-hidden={!rendered && !open}
      style={{
        maxHeight: rendered ? maxH : 0,
        transition: `max-height ${durationMs}ms ease, opacity ${durationMs - 80}ms ease, transform ${durationMs - 80}ms ease`,
      }}
      className={[
        "overflow-hidden will-change-[max-height,opacity,transform]",
        open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1",
        className ?? "",
      ].join(" ")}
    >
      <div ref={ref}>{children}</div>
    </div>
  )
}
