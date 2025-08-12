"use client"

import React, { Fragment, useState } from "react"
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
  /** callbacks */
  onCancel?: () => void
  onConfirm?: () => void | Promise<void>
  /** comportamiento */
  closeAfterCancel?: boolean        // default: true
  closeAfterConfirm?: boolean       // default: true (después de await onConfirm)
  dismissAsCancel?: boolean         // default: true (clic afuera/Esc = cancelar)
  /** textos/estilo del footer por defecto */
  cancelText?: React.ReactNode      // default: "Cancelar"
  confirmText?: React.ReactNode     // default: "Confirmar"
  confirmVariant?: "primary" | "secondary" | "destructive" // default: "primary"
  showCloseButton?: boolean         // default: true
}

export const Dialog = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  className,
  onCancel,
  onConfirm,
  closeAfterCancel = true,
  closeAfterConfirm = true,
  dismissAsCancel = true,
  cancelText = "Cancelar",
  confirmText = "Confirmar",
  confirmVariant = "primary",
  showCloseButton = true,
}: DialogProps) => {
  const [busy, setBusy] = useState(false)

  const handleRequestClose = () => {
    // Cerrar por overlay/Esc
    if (dismissAsCancel && onCancel) onCancel()
    onClose()
  }

  const handleCancel = () => {
    onCancel?.()
    if (closeAfterCancel) onClose()
  }

  const handleConfirm = async () => {
    if (!onConfirm) {
      if (closeAfterConfirm) onClose()
      return
    }
    try {
      setBusy(true)
      await onConfirm()
      if (closeAfterConfirm) onClose()
    } finally {
      setBusy(false)
    }
  }

  const defaultFooter = (
    <>
      <Button variant="secondary" onClick={handleCancel} disabled={busy}>
        {cancelText}
      </Button>
      <Button variant={confirmVariant} onClick={handleConfirm} disabled={busy}>
        {busy ? "Procesando…" : confirmText}
      </Button>
    </>
  )

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <HeadlessDialog as="div" className="relative z-50" onClose={handleRequestClose}>
        {/* Overlay */}
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

        {/* Panel */}
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
                            text-left align-middle transition-all ${className || ""}`}
              >
                {title && (
                  <HeadlessDialog.Title
                    as="div"
                    className="px-6 py-4 border-b border-y2k-silver-light
                               bg-gradient-to-r from-y2k-silver-light/50 to-transparent"
                  >
                    <h3 className="text-lg font-bold font-y2k text-gray-800">{title}</h3>
                    {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
                  </HeadlessDialog.Title>
                )}

                <div className="p-6">{children}</div>

                <div className="px-6 py-4 border-t border-y2k-silver-light bg-gradient-to-r from-transparent to-y2k-silver-light/30 flex justify-end gap-2">
                  {footer ?? defaultFooter}
                </div>

                {showCloseButton && (
                  <button
                    type="button"
                    className="absolute top-3 right-3 rounded-full p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-y2k-blue"
                    onClick={handleCancel}
                    aria-label="Cerrar"
                    disabled={busy}
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </HeadlessDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessDialog>
    </Transition>
  )
}
