"use client"

import React from "react"

import { Fragment, useState, useRef } from "react"
import { Menu, Transition } from "@headlessui/react"

export interface DropdownItem {
  label: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  icon?: React.ReactNode
  divider?: boolean
}

export interface DropdownProps {
  trigger: React.ReactNode
  items: DropdownItem[]
  align?: "left" | "right"
  className?: string
  width?: "auto" | "sm" | "md" | "lg"
}

export const Dropdown = ({ trigger, items, align = "left", className = "", width = "auto" }: DropdownProps) => {
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const widthClasses = {
    auto: "w-auto min-w-[12rem]",
    sm: "w-48",
    md: "w-56",
    lg: "w-64",
  }

  // Calcular la posición del menú cuando se abre
  const updateMenuPosition = () => {
    if (buttonRef.current && menuRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect()
      const menuRect = menuRef.current.getBoundingClientRect()

      // Posición base
      let top = buttonRect.bottom + window.scrollY + 5
      let left =
        align === "left" ? buttonRect.left + window.scrollX : buttonRect.right + window.scrollX - menuRect.width

      // Ajustar si está fuera de la pantalla
      const rightEdge = left + menuRect.width
      const bottomEdge = top + menuRect.height

      if (rightEdge > window.innerWidth) {
        left = window.innerWidth - menuRect.width - 10
      }

      if (bottomEdge > window.innerHeight + window.scrollY) {
        top = buttonRect.top + window.scrollY - menuRect.height - 5
      }

      setMenuPosition({ top, left })
    }
  }

  return (
    <Menu as="div" className={`relative inline-block text-left ${className}`}>
      {({ open }) => (
        <>
          <Menu.Button
            ref={buttonRef}
            className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium
                     bg-gradient-to-b from-white to-y2k-silver-light
                     border-2 border-y2k-silver
                     shadow-y2k-button
                     hover:brightness-105
                     focus:outline-none focus:ring-2 focus:ring-y2k-blue focus:ring-opacity-50"
            onClick={() => {
              // Actualizar posición cuando se abre el menú
              setTimeout(updateMenuPosition, 0)
            }}
          >
            {trigger}
          </Menu.Button>

          <Transition
            as={Fragment}
            show={open}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
            afterEnter={updateMenuPosition}
          >
            <Menu.Items
              ref={menuRef}
              className={`fixed z-50 mt-2 origin-top-right rounded-md bg-white border-2 border-y2k-silver-light shadow-y2k-card focus:outline-none ${widthClasses[width]}`}
              style={{
                top: `${menuPosition.top}px`,
                left: `${menuPosition.left}px`,
                maxHeight: "80vh",
                overflowY: "auto",
              }}
            >
              <div className="py-1">
                {items.map((item, index) => (
                  <Fragment key={index}>
                    <Menu.Item disabled={item.disabled}>
                      {({ active }) => (
                        <button
                          onClick={item.onClick}
                          className={`
                            ${active ? "bg-y2k-blue-light/20" : ""}
                            ${item.disabled ? "opacity-50 cursor-not-allowed" : ""}
                            group flex w-full items-center px-4 py-2 text-sm
                          `}
                          disabled={item.disabled}
                        >
                          {item.icon && <span className="mr-2">{item.icon}</span>}
                          {item.label}
                        </button>
                      )}
                    </Menu.Item>
                    {item.divider && <hr className="my-1 border-y2k-silver-light" />}
                  </Fragment>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}

