"use client"

import React, { useState } from "react"
import { Label } from "./Label"

export interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  id?: string
}

const FloatingLabelInput = React.forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ className, label, error, id: propsId, value, onChange, ...props }, ref) => {
    const generatedId = React.useId()

    const inputId = propsId || generatedId
    const [isFocused, setIsFocused] = useState(false)
    const [inputValue, setInputValue] = useState(value || "")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value)
      onChange?.(e)
    }

    const isActive = isFocused || inputValue !== ""

    return (
      <div className="w-full">
        <div className="relative">
          <input
            id={inputId}
            className={`w-full rounded-md px-3 py-2 text-sm
                      bg-white border-2 ${error ? "border-y2k-pink-dark" : "border-y2k-silver"}
                      shadow-y2k-inner
                      focus:outline-none focus:border-y2k-blue focus:ring-1 focus:ring-y2k-blue
                      disabled:opacity-50 disabled:bg-y2k-silver-light
                      transition-colors duration-200 pt-4 pb-2 ${className}`}
            ref={ref}
            value={inputValue}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          <Label
            htmlFor={inputId}
            className={`absolute left-3 text-gray-500 pointer-events-none
                      transition-all duration-200
                      ${isActive ? "transform -translate-y-3 scale-75 text-y2k-blue" : "top-2.5"}`}
          >
            {label}
          </Label>
        </div>
        {error && <p className="mt-1 text-xs text-y2k-pink-dark">{error}</p>}
      </div>
    )
  },
)

FloatingLabelInput.displayName = "FloatingLabelInput"

export { FloatingLabelInput }

