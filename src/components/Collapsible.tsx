"use client"

import React, { useEffect, useRef, useState } from "react"
import { Disclosure } from "@headlessui/react"

export interface CollapsibleProps {
  title: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
  className?: string
  durationMs?: number
}

export const Collapsible = ({
  title,
  children,
  defaultOpen = false,
  className,
  durationMs = 280,
}: CollapsibleProps) => {
  return (
    <div className={`border-2 border-y2k-silver-light rounded-lg overflow-hidden shadow-y2k-card ${className || ""}`}>
      <Disclosure defaultOpen={defaultOpen}>
        {({ open }) => (
          <>
            <Disclosure.Button
              className="w-full px-6 py-4 flex justify-between items-center
                         bg-gradient-to-r from-y2k-silver-light/50 to-transparent
                         text-left text-gray-800 font-bold font-y2k"
            >
              <span>{title}</span>
              <svg
                className={`w-5 h-5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Disclosure.Button>

            <SmoothPanel open={open} durationMs={durationMs}>
              <div className="px-6 py-4 border-t border-y2k-silver-light">{children}</div>
            </SmoothPanel>
          </>
        )}
      </Disclosure>
    </div>
  )
}

/** Panel con animación suave de altura + opacidad + leve translate */
function SmoothPanel({
  open,
  durationMs,
  children,
}: {
  open: boolean
  durationMs: number
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [maxH, setMaxH] = useState<number>(open ? 9999 : 0) // 9999 para el primer render abierto
  const [rendered, setRendered] = useState<boolean>(open)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (open) {
      // Asegura que el contenido esté en el DOM para medir
      setRendered(true)
      // Espera al siguiente frame para medir scrollHeight con estilos aplicados
      requestAnimationFrame(() => {
        setMaxH(el.scrollHeight)
      })
    } else {
      // Cierra animando hacia 0 y, al finalizar, saca del flujo si querés
      setMaxH(el.scrollHeight) // setea alto actual para iniciar transición
      requestAnimationFrame(() => setMaxH(0))
      // Opcional: desmontar visualmente tras la animación
      const t = setTimeout(() => setRendered(false), durationMs)
      return () => clearTimeout(t)
    }
  }, [open, durationMs])

  // Cuando vuelve a abrir y el contenido cambió de tamaño, re-calcula
  useEffect(() => {
    if (open && ref.current) setMaxH(ref.current.scrollHeight)
  }, [children, open])

  return (
    <div
      aria-hidden={!open && !rendered}
      style={{
        maxHeight: rendered ? maxH : 0,
        transition: `max-height ${durationMs}ms ease, opacity ${durationMs - 80}ms ease, transform ${
          durationMs - 80
        }ms ease`,
      }}
      className={`overflow-hidden will-change-[max-height,opacity,transform] 
                  ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}`}
    >
      <div ref={ref}>{children}</div>
    </div>
  )
}
