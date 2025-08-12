"use client"

import React from "react"
import { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"

export interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  title?: React.ReactNode
  children: React.ReactNode
  position?: "left" | "right"
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

export const Drawer = ({
  isOpen,
  onClose,
  title,
  children,
  position = "right",
  size = "md",
  className,
}: DrawerProps) => {
  const sizeClasses = {
    sm: "max-w-xs",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  }

  const positionClasses = {
    left: "left-0",
    right: "right-0",
  }

  const translateClasses = {
    left: {
      enter: "translate-x-0",
      enterFrom: "-translate-x-full",
      leaveTo: "-translate-x-full",
    },
    right: {
      enter: "translate-x-0",
      enterFrom: "translate-x-full",
      leaveTo: "translate-x-full",
    },
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className={`fixed inset-y-0 ${positionClasses[position]} flex max-w-full`}>
              <Transition.Child
                as={Fragment}
                enter={`transform transition ease-in-out duration-300 ${translateClasses[position].enter}`}
                enterFrom={translateClasses[position].enterFrom}
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo={translateClasses[position].leaveTo}
              >
                <Dialog.Panel className={`w-screen ${sizeClasses[size]} ${className}`}>
                  <div className="flex h-full flex-col bg-white border-l-2 border-y2k-silver-light shadow-y2k-card">
                    {title && (
                      <div className="px-6 py-4 border-b border-y2k-silver-light bg-gradient-to-r from-y2k-silver-light/50 to-transparent">
                        <Dialog.Title className="text-lg font-bold font-y2k text-gray-800">{title}</Dialog.Title>
                        <button
                          type="button"
                          className="absolute top-3 right-3 rounded-full p-1 text-gray-400 hover:text-gray-600"
                          onClick={onClose}
                        >
                          <span className="sr-only">Close</span>
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                    <div className="flex-1 overflow-y-auto p-6">{children}</div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

