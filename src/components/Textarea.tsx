import React from "react"
import { cva, type VariantProps } from "class-variance-authority"

const textareaVariants = cva(
  [
    "w-full rounded-md px-3 py-2 text-sm",
    "bg-white border-2 border-y2k-silver",
    "shadow-y2k-inner",
    "focus:outline-none focus:border-y2k-blue focus:ring-1 focus:ring-y2k-blue",
    "disabled:opacity-50 disabled:bg-y2k-silver-light",
    "transition-colors duration-200",
    "resize-y min-h-[80px]",
  ],
  {
    variants: {
      variant: {
        default: "border-y2k-silver",
        error: "border-y2k-pink-dark",
      },
      size: {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-2 text-sm",
        lg: "px-4 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
)

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  label?: string
  error?: string
  id?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, size, label, error, id: propsId, ...props }, ref) => {
    const textareaId = React.useId()
    const id = propsId || textareaId

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block mb-1.5 text-sm font-bold font-y2k text-gray-700">
            {label}
          </label>
        )}
        <textarea
          id={id}
          className={textareaVariants({ variant: error ? "error" : variant, size, className })}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-y2k-pink-dark">{error}</p>}
      </div>
    )
  },
)

Textarea.displayName = "Textarea"

export { Textarea, textareaVariants }

