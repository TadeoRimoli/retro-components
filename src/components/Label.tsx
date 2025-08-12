import React from "react"
import { cva, type VariantProps } from "class-variance-authority"

const labelVariants = cva("text-sm font-medium", {
  variants: {
    variant: {
      default: "text-gray-700 font-y2k",
      required: "text-gray-700 font-y2k after:content-['*'] after:ml-0.5 after:text-y2k-pink-dark",
    },
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
    type: {
      inline: "inline-block mr-2",
      stacked: "block mb-1.5",
      floating: "absolute left-2 -top-2.5 px-1 bg-white text-xs transition-all duration-200",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    type: "stacked",
  },
})

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement>, VariantProps<typeof labelVariants> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, variant, size, type, ...props }, ref) => {
  return <label className={labelVariants({ variant, size, type, className })} ref={ref} {...props} />
})

Label.displayName = "Label"

export { Label, labelVariants }

