"use client"

import React, { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { cva, type VariantProps } from "class-variance-authority"
import clsx from "clsx"

const toastVariants = cva(
  "rounded-lg border-2 p-4 shadow-y2k-card max-w-md w-full transform transition-all duration-300 ease-in-out fixed z-50",
  {
    variants: {
      variant: {
        info: "bg-gradient-to-r from-y2k-blue-light/20 to-white border-y2k-blue-light text-y2k-blue-dark",
        success: "bg-gradient-to-r from-green-400/20 to-white border-green-400 text-green-700",
        warning: "bg-gradient-to-r from-yellow-400/20 to-white border-yellow-400 text-yellow-700",
        error: "bg-gradient-to-r from-y2k-pink-light/20 to-white border-y2k-pink text-y2k-pink-dark",
      },
      position: {
        "top-right": "top-4 right-4",
        "top-left": "top-4 left-4",
        "bottom-right": "bottom-4 right-4",
        "bottom-left": "bottom-4 left-4",
      },
      visible: {
        true: "opacity-100 translate-y-0",
        false: "opacity-0 translate-y-4 pointer-events-none",
      },
    },
    defaultVariants: {
      variant: "info",
      position: "top-right",
      visible: false,
    },
  }
)

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  title?: string
  icon?: React.ReactNode
  duration?: number
  onClose?: () => void
}

export const Toast = ({
  className,
  variant,
  position,
  visible,
  title,
  icon,
  duration = 4000,
  onClose,
  children,
  ...props
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(visible)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    setIsVisible(visible)

    if (visible && duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(() => onClose?.(), 300)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [visible, duration, onClose])

  if (!mounted) return null

  return createPortal(
    <div
      className={toastVariants({
        variant,
        position,
        visible: isVisible,
        className,
      })}
      {...props}
    >
      <div className="flex items-start">
        {icon && <div className="mr-3">{icon}</div>}
        <div className="flex-1">
          {title && <h5 className="font-bold font-y2k mb-1">{title}</h5>}
          <div className="text-sm">{children}</div>
        </div>
        <button
          onClick={() => {
            setIsVisible(false)
            setTimeout(() => onClose?.(), 300)
          }}
          className="ml-3 p-1 rounded-full opacity-70 hover:opacity-100"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>,
    document.body
  )
}
