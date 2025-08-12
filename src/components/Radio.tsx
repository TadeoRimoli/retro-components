import React from "react"

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(({ className, label, id, ...props }, ref) => {
  const radioId = id || React.useId()

  return (
    <div className="flex items-center">
      <div className="relative flex items-center">
        <input type="radio" id={radioId} className="sr-only peer" ref={ref} {...props} />
        <div
          className="w-5 h-5 border-2 border-y2k-silver bg-white rounded-full 
                        peer-focus:border-y2k-blue peer-focus:ring-1 peer-focus:ring-y2k-blue
                        shadow-y2k-inner
                        transition-colors duration-200"
        ></div>
        <div
          className="absolute w-2.5 h-2.5 bg-y2k-blue rounded-full left-[5px] top-[5px] 
                         opacity-0 peer-checked:opacity-100 transition-opacity"
        ></div>
      </div>
      {label && (
        <label htmlFor={radioId} className="ml-2 text-sm font-medium text-gray-700 cursor-pointer">
          {label}
        </label>
      )}
    </div>
  )
})

Radio.displayName = "Radio"

export { Radio }

