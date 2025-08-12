import React from "react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  id?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, id: propsId, ...props }, ref) => {
    const inputId = React.useId()
    const id = propsId || inputId

    const baseClasses =
      "w-full rounded-md px-3 py-2 text-sm bg-white border-2 border-gray-300 shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.25)] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:bg-gray-100 transition-colors duration-200"
    const errorClasses = error ? "border-pink-600" : ""
    const classes = `${baseClasses} ${errorClasses} ${className}`

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block mb-1.5 text-sm font-bold font-[Orbitron] text-gray-700">
            {label}
          </label>
        )}
        <input id={id} className={classes} ref={ref} {...props} />
        {error && <p className="mt-1 text-xs text-pink-600">{error}</p>}
      </div>
    )
  },
)

Input.displayName = "Input"

export { Input }

