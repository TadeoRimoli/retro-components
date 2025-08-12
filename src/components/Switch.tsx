import React from "react"

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(({ className = "", label, id, ...props }, ref) => {
  const switchId = id || React.useId()

  return (
    <div className="flex items-center">
      <div className="relative inline-flex items-center">
        <input type="checkbox" id={switchId} className="sr-only peer" ref={ref} {...props} />
        <div className="w-11 h-6 bg-gray-400 rounded-full peer-focus:ring-2 peer-focus:ring-blue-500 peer-checked:bg-blue-500 border-2 border-gray-200 shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.25)] transition-colors duration-200"></div>
        <div className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full border border-gray-300 shadow-md peer-checked:left-5 transition-all duration-200"></div>
      </div>
      {label && (
        <label htmlFor={switchId} className="ml-2 text-sm font-medium text-gray-700 cursor-pointer">
          {label}
        </label>
      )}
    </div>
  )
})

Switch.displayName = "Switch"

export { Switch }

