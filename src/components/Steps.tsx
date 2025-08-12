import React from "react"
import { cva, type VariantProps } from "class-variance-authority"

const stepsVariants = cva("flex", {
  variants: {
    orientation: {
      horizontal: "flex-row items-center",
      vertical: "flex-col items-start space-y-4",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
})

export interface Step {
  label: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
}

export interface StepsProps extends VariantProps<typeof stepsVariants> {
  steps: Step[]
  currentStep: number
  className?: string
}

export const Steps = ({ steps, currentStep, orientation = "horizontal", className }: StepsProps) => {
  return (
    <div className={stepsVariants({ orientation, className })}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep
        const isCurrent = index === currentStep
        const isUpcoming = index > currentStep

        return (
          <React.Fragment key={index}>
            {/* Step */}
            <div className={`flex ${orientation === "horizontal" ? "flex-col items-center" : "flex-row items-center"}`}>
              {/* Step Circle */}
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2
                          ${
                            isCompleted
                              ? "bg-y2k-blue border-y2k-blue-dark text-white"
                              : isCurrent
                                ? "bg-white border-y2k-blue text-y2k-blue"
                                : "bg-white border-y2k-silver-dark text-gray-400"
                          }
                          ${isCompleted || isCurrent ? "shadow-y2k-outer" : ""}
                          transition-colors duration-200`}
              >
                {step.icon ? (
                  step.icon
                ) : isCompleted ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-sm font-bold">{index + 1}</span>
                )}
              </div>

              {/* Step Content */}
              <div className={`${orientation === "horizontal" ? "mt-2 text-center" : "ml-4"}`}>
                <div
                  className={`text-sm font-bold font-y2k
                              ${isCompleted ? "text-gray-700" : isCurrent ? "text-y2k-blue" : "text-gray-400"}`}
                >
                  {step.label}
                </div>
                {step.description && (
                  <div
                    className={`text-xs mt-1
                                ${isCompleted || isCurrent ? "text-gray-600" : "text-gray-400"}`}
                  >
                    {step.description}
                  </div>
                )}
              </div>
            </div>

            {/* Connector */}
            {index < steps.length - 1 && (
              <div
                className={`
                  ${orientation === "horizontal" ? "flex-1 h-0.5 mx-2" : "w-0.5 h-8 ml-5"}
                  ${isCompleted ? "bg-y2k-blue" : "bg-y2k-silver-light"}
                `}
              />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

