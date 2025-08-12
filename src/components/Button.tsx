import React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "destructive" | "ghost"
  size?: "sm" | "md" | "lg"
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", leftIcon, rightIcon, children, ...props }, ref) => {
    const baseClasses =
      "relative inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none font-[Orbitron] tracking-wide uppercase border-2 border-b-4 active:border-b-2 active:translate-y-0.5"

    const variantClasses = {
      primary:
        "bg-gradient-to-r from-blue-500 to-blue-400 text-white border-blue-700 border-b-blue-800 shadow-md hover:brightness-110",
      secondary:
        "bg-gradient-to-r from-gray-300 to-gray-200 text-gray-800 border-gray-400 border-b-gray-500 shadow-md hover:brightness-105",
      destructive:
        "bg-gradient-to-r from-pink-500 to-pink-400 text-white border-pink-700 border-b-pink-800 shadow-md hover:brightness-110",
      ghost: "bg-transparent text-gray-800 border-transparent hover:bg-gray-200/30 hover:border-gray-300",
    }

    const sizeClasses = {
      sm: "text-xs px-3 py-1.5 h-8",
      md: "text-sm px-4 py-2 h-10",
      lg: "text-base px-5 py-2.5 h-12",
    }

    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`
    return (
      <button className={classes} ref={ref} {...props}>
        {leftIcon && <span className="inline-flex mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="inline-flex ml-2">{rightIcon}</span>}
      </button>
    )
  },
)

Button.displayName = "Button"

export { Button }

