import React from "react"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "primary" | "secondary" | "accent"
  hover?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", variant = "default", hover = false, ...props }, ref) => {
    const baseClasses = "rounded-lg overflow-hidden border-2 border-gray-200 shadow-md transition-all duration-200"

    const variantClasses = {
      default: "bg-white",
      primary: "bg-gradient-to-b from-blue-50 to-white border-blue-200",
      secondary: "bg-gradient-to-b from-gray-100 to-white",
      accent: "bg-gradient-to-b from-pink-50 to-white border-pink-200",
    }

    const hoverClasses = hover ? "hover:shadow-lg hover:-translate-y-1 hover:border-opacity-80" : ""

    const classes = `${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`

    return <div className={classes} ref={ref} {...props} />
  },
)

Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => (
    <div
      ref={ref}
      className={`px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-100/50 to-transparent ${className}`}
      {...props}
    />
  ),
)

CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className = "", ...props }, ref) => (
    <h3 ref={ref} className={`text-lg font-bold font-[Orbitron] text-gray-800 ${className}`} {...props} />
  ),
)

CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className = "", ...props }, ref) => <p ref={ref} className={`text-sm text-gray-600 ${className}`} {...props} />,
)

CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => <div ref={ref} className={`p-6 ${className}`} {...props} />,
)

CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => (
    <div
      ref={ref}
      className={`px-6 py-4 border-t border-gray-200 bg-gradient-to-r from-transparent to-gray-100/30 ${className}`}
      {...props}
    />
  ),
)

CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }

