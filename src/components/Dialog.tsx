"use client"

import React, { Fragment } from "react"
import { Dialog as HeadlessDialog, Transition } from "@headlessui/react"
import { Button } from "./Button"

export interface DialogProps {
  isOpen: boolean
  onClose: () => void
  title?: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

export const Dialog = ({ isOpen, onClose, title, description, children, footer, className }: DialogProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <HeadlessDialog as="div" className="relative z-50" onClose={onClose}>
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

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <HeadlessDialog.Panel
                className={`w-full max-w-md transform overflow-hidden rounded-lg 
                          bg-white border-2 border-y2k-silver-light shadow-y2k-card
                          text-left align-middle transition-all ${className}`}
              >
                {title && (
                  <HeadlessDialog.Title
                    as="div"
                    className="px-6 py-4 border-b border-y2k-silver-light bg-gradient-to-r from-y2k-silver-light/50 to-transparent"
                  >
                    <h3 className="text-lg font-bold font-y2k text-gray-800">{title}</h3>
                    {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
                  </HeadlessDialog.Title>
                )}

                <div className="p-6">{children}</div>

                {footer && (
                  <div className="px-6 py-4 border-t border-y2k-silver-light bg-gradient-to-r from-transparent to-y2k-silver-light/30 flex justify-end gap-2">
                    {footer}
                  </div>
                )}

                <button
                  type="button"
                  className="absolute top-3 right-3 rounded-full p-1 text-gray-400 hover:text-gray-600"
                  onClick={onClose}
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </HeadlessDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessDialog>
    </Transition>
  )
}

export const DialogDemo = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>

      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Dialog Title"
        description="This is a description of the dialog content."
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Confirm</Button>
          </>
        }
      >
        <p>This is the main content of the dialog.</p>
      </Dialog>
    </>
  )
}

