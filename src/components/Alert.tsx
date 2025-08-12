"use client"

import React from "react"

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "success" | "warning" | "error"
  title?: string
  icon?: React.ReactNode
  onClose?: () => void
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className = "", variant = "info", title, icon, onClose, children, ...props }, ref) => {
    const baseClasses = "relative w-full rounded-lg border-2 p-4 shadow-md"

    const variantClasses = {
      info: "bg-gradient-to-r from-blue-50 to-white border-blue-300 text-blue-800",
      success: "bg-gradient-to-r from-green-50 to-white border-green-300 text-green-800",
      warning: "bg-gradient-to-r from-yellow-50 to-white border-yellow-300 text-amber-700",
      error: "bg-gradient-to-r from-pink-50 to-white border-pink-300 text-pink-800",
    }

    const classes = `${baseClasses} ${variantClasses[variant]} ${className}`

    return (
      <div ref={ref} className={classes} {...props}>
        <div className="flex items-start">
          {icon && <div className="flex-shrink-0 mr-3">{icon}</div>}
          <div className="flex-1">
            {title && <h5 className="mb-1 font-bold font-[Orbitron]">{title}</h5>}
            <div className="text-sm">{children}</div>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="ml-3 flex-shrink-0 rounded-full p-1 opacity-70 hover:opacity-100"
            >
              <span className="sr-only">Close</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    )
  },
)

Alert.displayName = "Alert"

