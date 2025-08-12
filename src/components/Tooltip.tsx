"use client"

import React, { useState, useRef, useEffect } from "react"

export interface TooltipProps {
  content: React.ReactNode
  children: React.ReactElement
  position?: "top" | "right" | "bottom" | "left"
  delay?: number
  className?: string
}

export const Tooltip = ({
  content,
  children,
  position = "top",
  delay = 300,
  className = "",
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement>(null)

  const showTooltip = () => {
    setTimeout(() => setIsVisible(true), delay)
  }

  const hideTooltip = () => {
    setIsVisible(false)
  }

  // Calcula la posición una vez montado y visible
  useEffect(() => {
    if (!isVisible || !tooltipRef.current || !triggerRef.current) return

    const tooltip = tooltipRef.current
    const trigger = triggerRef.current

    const triggerRect = trigger.getBoundingClientRect()
    const tooltipRect = tooltip.getBoundingClientRect()
    const parentRect = trigger.offsetParent?.getBoundingClientRect() ?? { top: 0, left: 0 }

    let left = 0
    let top = 0

    switch (position) {
      case "top":
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
        top = triggerRect.top - tooltipRect.height - 8
        break
      case "bottom":
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
        top = triggerRect.bottom + 8
        break
      case "left":
        left = triggerRect.left - tooltipRect.width - 8
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
        break
      case "right":
        left = triggerRect.right + 8
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
        break
    }

    tooltip.style.left = `${left - parentRect.left}px`
    tooltip.style.top = `${top - parentRect.top}px`
  }, [isVisible, position])

  const clonedChild = React.cloneElement(children, {
    ref: triggerRef,
    onMouseEnter: showTooltip,
    onMouseLeave: hideTooltip,
    onFocus: showTooltip,
    onBlur: hideTooltip,
  })

  return (
    <>
      {clonedChild}
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`absolute z-50 px-3 py-2 text-sm font-medium text-white
            bg-gray-800 rounded-md shadow-lg border border-gray-700
            transition-opacity duration-200 ${className}`}
        >
          {content}
        </div>
      )}
    </>
  )
}
