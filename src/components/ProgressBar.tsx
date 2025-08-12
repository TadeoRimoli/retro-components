import React from "react"

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  variant?: "default" | "success" | "warning" | "error"
  size?: "sm" | "md" | "lg"
  animated?: boolean
  showLabel?: boolean
}

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      className = "",
      variant = "default",
      size = "md",
      animated = true,
      value,
      max = 100,
      showLabel = false,
      ...props
    },
    ref,
  ) => {
    // Ensure value is between 0 and max
    const clampedValue = Math.max(0, Math.min(value, max))
    const percentage = (clampedValue / max) * 100

    const containerClasses =
      "w-full h-4 bg-gray-100 rounded-full overflow-hidden border-2 border-gray-300 shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.25)]"

    const sizeClasses = {
      sm: "h-2",
      md: "h-4",
      lg: "h-6",
    }

    const fillClasses = {
      default: "bg-gradient-to-r from-blue-600 to-blue-400",
      success: "bg-gradient-to-r from-green-600 to-green-400",
      warning: "bg-gradient-to-r from-yellow-500 to-amber-400",
      error: "bg-gradient-to-r from-pink-600 to-pink-400",
    }

    const animationClass = animated
      ? "relative after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/30 after:to-transparent after:animate-shimmer"
      : ""

    const containerClass = `${containerClasses} ${sizeClasses[size]} ${className}`
    const fillClass = `h-full rounded-full transition-all duration-300 ease-in-out ${fillClasses[variant]} ${animationClass}`

    return (
      <div className="w-full">
        <div
          ref={ref}
          className={containerClass}
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={max}
          {...props}
        >
          <div className={fillClass} style={{ width: `${percentage}%` }} />
        </div>
        {showLabel && <div className="mt-1 text-xs font-medium text-right">{percentage.toFixed(0)}%</div>}
      </div>
    )
  },
)

ProgressBar.displayName = "ProgressBar"

