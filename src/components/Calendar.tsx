"use client"

import React, { useEffect, useMemo, useState, KeyboardEvent } from "react"

export type CalendarRetroProps = {
  value?: Date
  onChange?: (date: Date) => void
  className?: string
  locale?: string
  weekStartsOn?: 0 | 1 // 0=domingo, 1=lunes
  minDate?: Date
  maxDate?: Date
  showOutsideDays?: boolean
  /** Sobrescribir clases (slots) sin romper el look retro */
  slots?: {
    container?: string
    header?: string
    monthLabel?: string
    navBtn?: string
    dowCell?: string
    grid?: string
    day?: string
    dayOutside?: string
    dayToday?: string
    daySelected?: string
    dayDisabled?: string
  }
}

export const Calendar = ({
  value,
  onChange,
  className = "",
  locale,
  weekStartsOn = 0,
  minDate,
  maxDate,
  showOutsideDays = true,
  slots,
}: CalendarRetroProps) => {
  const [viewDate, setViewDate] = useState<Date>(value || new Date())
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value)

  useEffect(() => {
    if (value) {
      setSelectedDate(value)
      setViewDate(value)
    }
  }, [value])

  const resolvedLocale = locale || (typeof navigator !== "undefined" ? navigator.language : "en-US")

  const daysOfWeek = useMemo(() => {
    const baseDate = new Date(Date.UTC(2021, 5, 6)) // Sunday
    return Array.from({ length: 7 }).map((_, i) => {
      const day = new Date(baseDate)
      day.setDate(baseDate.getDate() + i)
      return new Intl.DateTimeFormat(resolvedLocale, { weekday: "short" }).format(day)
    })
  }, [resolvedLocale])

  const monthName = useMemo(() => {
    return new Intl.DateTimeFormat(resolvedLocale, { month: "long" }).format(viewDate)
  }, [viewDate, resolvedLocale])

  const isDisabled = (d: Date) => {
    if (minDate && d < stripTime(minDate)) return true
    if (maxDate && d > stripTime(maxDate)) return true
    return false
  }

  const goToPreviousMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))
  const goToNextMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))
  const goToPreviousYear = () => setViewDate(new Date(viewDate.getFullYear() - 1, viewDate.getMonth(), 1))
  const goToNextYear = () => setViewDate(new Date(viewDate.getFullYear() + 1, viewDate.getMonth(), 1))

  const handleSelect = (d: Date) => {
    if (isDisabled(d)) return
    setSelectedDate(d)
    onChange?.(d)
  }

  const handleKey = (e: KeyboardEvent<HTMLButtonElement>, date: Date) => {
    // Enter o Space seleccionan
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      handleSelect(date)
      return
    }
    // Navegación por flechas
    let delta = 0
    if (e.key === "ArrowLeft") delta = -1
    if (e.key === "ArrowRight") delta = 1
    if (e.key === "ArrowUp") delta = -7
    if (e.key === "ArrowDown") delta = 7
    if (delta !== 0) {
      e.preventDefault()
      const next = new Date(date)
      next.setDate(date.getDate() + delta)
      // si cambia de mes, movemos la vista
      if (next.getMonth() !== viewDate.getMonth() || next.getFullYear() !== viewDate.getFullYear()) {
        setViewDate(new Date(next.getFullYear(), next.getMonth(), 1))
      }
      const el = document.querySelector<HTMLButtonElement>(`button[data-key='${isoKey(next)}']`)
      el?.focus()
    }
  }

  const generateDays = () => {
    const year = viewDate.getFullYear()
    const month = viewDate.getMonth()
    const firstDayOfMonth = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const startOffset = (firstDayOfMonth - weekStartsOn + 7) % 7
    const cells: JSX.Element[] = []

    // Días del mes anterior
    if (showOutsideDays) {
      const prevDays = new Date(year, month, 0).getDate()
      for (let i = startOffset - 1; i >= 0; i--) {
        const d = new Date(year, month - 1, prevDays - i)
        cells.push(renderDay(d, true))
      }
    } else {
      for (let i = 0; i < startOffset; i++) cells.push(<div key={`empty-${i}`} />)
    }

    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      cells.push(renderDay(new Date(year, month, day), false))
    }

    // Días del mes siguiente
    if (showOutsideDays) {
      const tail = (7 - (cells.length % 7)) % 7
      for (let i = 1; i <= tail; i++) cells.push(renderDay(new Date(year, month + 1, i), true))
    }

    return cells
  }

  const renderDay = (date: Date, outside: boolean) => {
    const today = stripTime(new Date())
    const dKey = isoKey(date)
    const isToday = today.getTime() === stripTime(date).getTime()
    const isSelected = selectedDate ? stripTime(selectedDate).getTime() === stripTime(date).getTime() : false
    const disabled = isDisabled(date) || (outside && !showOutsideDays)

    // Estética Y2K por defecto + slots
    const base =
  (slots?.day ??
    "h-10 w-10 rounded-full flex items-center justify-center text-sm relative " +
    "transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 " +
    "focus:ring-cyan-400 focus:ring-offset-white") +
  " text-[#2B3356]" // <- texto por defecto

    const cOutside = slots?.dayOutside ?? "text-gray-400"
    const cToday =
      slots?.dayToday ??
      "border-2 border-cyan-500 text-cyan-700 shadow-[inset_0_0_6px_rgba(0,180,255,0.35)]"
    const cSelected =
      slots?.daySelected ??
      "text-white font-bold " +
      "bg-gradient-to-br from-[#6ec1ff] via-[#3aa0ff] to-[#0066ff] " +
      "shadow-[inset_0_-2px_6px_rgba(255,255,255,0.35),0_4px_10px_rgba(0,102,255,0.35)] " +
      "before:content-[''] before:absolute before:inset-0 before:rounded-full " +
      "before:bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.55),transparent_50%)]"
    const cDisabled = slots?.dayDisabled ?? "opacity-40 cursor-not-allowed"

    const hover =
  !isSelected && !disabled
    ? "hover:bg-[#EEF2FF] hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)] hover:!text-[#1F2937]"
    : ""

    const cls = [
      base,
      outside ? cOutside : "",
      isToday && !isSelected ? cToday : "",
      isSelected ? cSelected : "",
      disabled ? cDisabled : hover,
    ]
      .join(" ")
      .trim()

    return (
      <button
        key={dKey}
        data-key={dKey}
        type="button"
        role="gridcell"
        tabIndex={isSelected ? 0 : -1}
        aria-selected={isSelected}
        aria-label={date.toLocaleDateString(resolvedLocale, { year: "numeric", month: "long", day: "numeric" })}
        className={cls}
        onClick={() => handleSelect(date)}
        onKeyDown={(e) => handleKey(e, date)}
        disabled={disabled}
      >
        {date.getDate()}
      </button>
    )
  }

  return (
    <div
      className={[
        // Contenedor con look retro (chrome + inner glow)
        "rounded-lg border-2",
        "bg-white",
        "shadow-[inset_0_0_12px_rgba(0,0,0,0.06),0_6px_18px_rgba(0,0,0,0.08)]",
        "border-[#D5D7E1]",
        "p-4",
        "select-none",
        // slot y className externo
        slots?.container ?? "",
        className,
      ].join(" ")}
      role="application"
      aria-label="Calendar"
    >
      {/* Header */}
      <div
        className={[
          "mb-4 rounded-md px-2 py-2",
          "bg-[linear-gradient(180deg,#E8ECF7_0%,#FFFFFF_100%)]",
          "border border-[#D5D7E1]",
          "flex items-center justify-between",
          slots?.header ?? "",
        ].join(" ")}
      >
        <div className="flex gap-1">
          <NavBtn onClick={goToPreviousYear} ariaLabel="Previous year" slots={slots}>
            «
          </NavBtn>
          <NavBtn onClick={goToPreviousMonth} ariaLabel="Previous month" slots={slots}>
            ‹
          </NavBtn>
        </div>

        <h2
          className={[
            "text-lg font-bold",
            "bg-clip-text text-transparent",
            "bg-[linear-gradient(90deg,#00B4FF_0%,#FF4FD8_100%)]",
            "drop-shadow-[0_1px_0_rgba(255,255,255,0.7)]",
            slots?.monthLabel ?? "",
          ].join(" ")}
        >
          {monthName} {viewDate.getFullYear()}
        </h2>

        <div className="flex gap-1">
          <NavBtn onClick={goToNextMonth} ariaLabel="Next month" slots={slots}>
            ›
          </NavBtn>
          <NavBtn onClick={goToNextYear} ariaLabel="Next year" slots={slots}>
            »
          </NavBtn>
        </div>
      </div>

      {/* Días de la semana */}
      <div className="grid grid-cols-7 gap-1 mb-2" role="row">
        {daysOfWeek.map((d, i) => (
          <div
            key={i}
            className={[
              "h-8 flex items-center justify-center text-xs font-bold",
              "text-[#3f4b6e]",
              "uppercase tracking-wide",
              slots?.dowCell ?? "",
            ].join(" ")}
            role="columnheader"
            aria-label={d}
            title={d}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Grilla de días */}
      <div className={["grid grid-cols-7 gap-1", slots?.grid ?? ""].join(" ")} role="grid">
        {generateDays()}
      </div>
    </div>
  )
}

/* ----------------- helpers & subcomponents ----------------- */

const stripTime = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
const isoKey = (d: Date) => d.toISOString().split("T")[0]

function NavBtn({
  onClick,
  children,
  ariaLabel,
  slots,
}: {
  onClick: () => void
  children: React.ReactNode
  ariaLabel: string
  slots?: CalendarRetroProps["slots"]
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={[
        "h-8 min-w-8 px-2 rounded-md border",
        "border-[#D5D7E1]",
        "bg-[linear-gradient(180deg,#FFFFFF_0%,#E9EEFF_100%)]",
        "text-[#243055]",
        "shadow-[inset_0_-2px_6px_rgba(255,255,255,0.6),0_2px_6px_rgba(0,0,0,0.08)]",
        "hover:bg-[linear-gradient(180deg,#FFFFFF_0%,#DAE6FF_100%)]",
        "active:translate-y-[1px]",
        "focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-white",
        slots?.navBtn ?? "",
      ].join(" ")}
    >
      {children}
    </button>
  )
}
