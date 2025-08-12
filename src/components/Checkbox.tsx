import React from "react"

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  id?: string
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = "", label, id: propsId, ...props }, ref) => {
    const checkboxId = propsId || React.useId()

    return (
      <div className="flex items-center">
        <div className="relative flex items-center">
          <input type="checkbox" id={checkboxId} className="sr-only peer" ref={ref} {...props} />
          <div className="w-5 h-5 border-2 border-gray-300 bg-white rounded peer-focus:border-blue-500 peer-focus:ring-1 peer-focus:ring-blue-500 peer-checked:bg-blue-500 peer-checked:border-blue-700 shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.25)] peer-checked:shadow-none transition-colors duration-200"></div>
          <svg
            className="absolute w-3.5 h-3.5 left-[3px] top-[3px] text-white opacity-0 peer-checked:opacity-100 transition-opacity"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        {label && (
          <label htmlFor={checkboxId} className="ml-2 text-sm font-medium text-gray-700 cursor-pointer">
            {label}
          </label>
        )}
      </div>
    )
  },
)

Checkbox.displayName = "Checkbox"

export { Checkbox }

