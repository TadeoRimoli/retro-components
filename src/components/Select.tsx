"use client"

import { useState } from "react"
import { Listbox } from "@headlessui/react"
import React from "react"

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps {
  options: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  label?: string
  error?: string
  disabled?: boolean
  className?: string
}

export const Select = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  error,
  disabled,
  className,
}: SelectProps) => {
  const [selectedValue, setSelectedValue] = useState(value || "")

  const handleChange = (newValue: string) => {
    setSelectedValue(newValue)
    onChange?.(newValue)
  }

  const selectedOption = options.find((option) => option.value === selectedValue)

  return (
    <div className={`w-full ${className}`}>
      {label && <label className="block mb-1.5 text-sm font-bold font-y2k text-gray-700">{label}</label>}

      <Listbox value={selectedValue} onChange={handleChange} disabled={disabled}>
        <div className="relative">
          <Listbox.Button
            className={`relative w-full rounded-md px-3 py-2 text-sm text-left
                      bg-white border-2 ${error ? "border-y2k-pink-dark" : "border-y2k-silver"}
                      shadow-y2k-inner
                      focus:outline-none focus:border-y2k-blue focus:ring-1 focus:ring-y2k-blue
                      disabled:opacity-50 disabled:bg-y2k-silver-light
                      transition-colors duration-200`}
          >
            <span className={`block truncate ${!selectedValue ? "text-gray-400" : ""}`}>
              {selectedOption?.label || placeholder}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                <path d="M7 7l3 3 3-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Listbox.Button>

          <Listbox.Options
            className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto text-sm bg-white rounded-md
                     border-2 border-y2k-silver shadow-y2k-card
                     focus:outline-none"
          >
            {options.map((option) => (
              <Listbox.Option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className={({ active, selected, disabled }) => `
                  cursor-pointer select-none relative py-2 pl-3 pr-9
                  ${active ? "bg-y2k-blue-light/20" : ""}
                  ${selected ? "bg-y2k-blue-light/40" : ""}
                  ${disabled ? "opacity-50 cursor-not-allowed" : ""}
                `}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{option.label}</span>
                    {selected && (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-y2k-blue">
                        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>

      {error && <p className="mt-1 text-xs text-y2k-pink-dark">{error}</p>}
    </div>
  )
}

