"use client"

import { useState, useRef, useEffect } from "react"
import { Calendar } from "./Calendar"
import { Input } from "./Input"
import React from "react"

type DatePickerProps = {
  value?: Date
  onChange?: (date: Date) => void
  label?: string
  placeholder?: string
  error?: string
  className?: string
}

export const DatePicker = ({
  value,
  onChange,
  label,
  placeholder = "Seleccionar fecha",
  error,
  className,
}: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value)
  const [isOpen, setIsOpen] = useState(false)
  const datePickerRef = useRef<HTMLDivElement>(null)

  const formatDate = (date?: Date) => {
    if (!date) return ""
    return date.toLocaleDateString()
  }

  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
    if (onChange) {
      onChange(date)
    }
    setIsOpen(false)
  }

  const toggleCalendar = () => {
    setIsOpen(!isOpen)
  }

  // Cerrar el calendario al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div ref={datePickerRef} className={`relative ${className}`}>
      <Input
        label={label}
        value={formatDate(selectedDate)}
        placeholder={placeholder}
        onClick={toggleCalendar}
        readOnly
        error={error}
        className="cursor-pointer"
      />

      {isOpen && (
        <div className="absolute z-50 mt-1">
          <Calendar value={selectedDate} onChange={handleDateChange} />
        </div>
      )}
    </div>
  )
}

