import React, { useEffect, useState, useMemo } from "react"

type CalendarProps = {
  value?: Date
  onChange?: (date: Date) => void
  className?: string
  locale?: string // New: locale can be passed
}

export const Calendar = ({ value, onChange, className = "", locale }: CalendarProps) => {
  const [viewDate, setViewDate] = useState<Date>(value || new Date())
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value)

  useEffect(() => {
    if (value) {
      setSelectedDate(value)
      setViewDate(value)
    }
  }, [value])

  const resolvedLocale = locale || navigator.language || "en-US"

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

  const goToPreviousMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))
  const goToNextMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))
  const goToPreviousYear = () => setViewDate(new Date(viewDate.getFullYear() - 1, viewDate.getMonth(), 1))
  const goToNextYear = () => setViewDate(new Date(viewDate.getFullYear() + 1, viewDate.getMonth(), 1))

  const handleDateSelect = (day: number) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day)
    setSelectedDate(newDate)
    onChange?.(newDate)
  }

  const generateDays = () => {
    const year = viewDate.getFullYear()
    const month = viewDate.getMonth()
    const firstDayOfMonth = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const today = new Date()
    const days = []

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const isToday = today.toDateString() === date.toDateString()
      const isSelected = selectedDate?.toDateString() === date.toDateString()

      days.push(
        <button
          key={`day-${day}`}
          type="button"
          onClick={() => handleDateSelect(day)}
          className={`
            h-10 w-10 rounded-full flex items-center justify-center text-sm relative
            ${isSelected ? "bg-gradient-to-br from-y2k-blue to-y2k-blue-dark text-white font-bold shadow-inner" : "hover:bg-y2k-silver-light"}
            ${isToday && !isSelected ? "border-2 border-y2k-blue text-y2k-blue" : ""}
          `}
        >
          {day}
          {isSelected && <span className="absolute inset-0 rounded-full animate-pulse opacity-30 bg-y2k-blue"></span>}
        </button>
      )
    }

    return days
  }

  return (
    <div className={`bg-white border-2 border-y2k-silver-light rounded-lg p-4 shadow-[inset_0_0_10px_rgba(0,0,0,0.05),_0_4px_6px_rgba(0,0,0,0.1)] ${className}`}>
      <div className="flex items-center justify-between mb-4 bg-gradient-to-r from-y2k-silver-light to-white p-2 rounded-md">
        <div className="flex space-x-1">
          <button onClick={goToPreviousYear} className="calendar-btn" aria-label="Previous year">&lt;&lt;</button>
          <button onClick={goToPreviousMonth} className="calendar-btn" aria-label="Previous month">&lt;</button>
        </div>
        <h2 className="text-lg font-bold font-y2k bg-gradient-to-r from-y2k-blue to-y2k-pink bg-clip-text text-transparent">
          {monthName} {viewDate.getFullYear()}
        </h2>
        <div className="flex space-x-1">
          <button onClick={goToNextMonth} className="calendar-btn" aria-label="Next month">&gt;</button>
          <button onClick={goToNextYear} className="calendar-btn" aria-label="Next year">&gt;&gt;</button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map((day, i) => (
          <div key={i} className="h-8 flex items-center justify-center text-xs font-bold text-y2k-blue">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">{generateDays()}</div>
    </div>
  )
}
