"use client"

import { Tab } from "@headlessui/react"
import { cva, type VariantProps } from "class-variance-authority"
import React from "react"

const tabsListVariants = cva(
  [
    "flex",
    "border-2 border-y2k-silver-light rounded-lg",
    "shadow-y2k-card",
    "p-1",
    "bg-gradient-to-r from-y2k-silver-light/30 to-white",
  ],
  {
    variants: {
      orientation: {
        horizontal: "flex-row space-x-1",
        vertical: "flex-col space-y-1 w-48",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  },
)

const tabVariants = cva(
  [
    "px-4 py-2 text-sm font-medium",
    "focus:outline-none",
    "transition-all duration-200",
    "ui-selected:shadow-y2k-inner ui-selected:bg-white ui-selected:font-bold",
    "ui-not-selected:hover:bg-y2k-silver-light/50",
  ],
  {
    variants: {
      orientation: {
        horizontal: "rounded-md text-center",
        vertical: "rounded-md text-left",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  },
)

const tabPanelsVariants = cva(["mt-4 rounded-lg", "border-2 border-y2k-silver-light", "shadow-y2k-card", "bg-white"], {
  variants: {
    orientation: {
      horizontal: "w-full",
      vertical: "flex-1",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
})

export interface TabItem {
  label: React.ReactNode
  content: React.ReactNode
  disabled?: boolean
}

export interface TabsProps extends VariantProps<typeof tabsListVariants> {
  items: TabItem[]
  defaultIndex?: number
  onChange?: (index: number) => void
  className?: string
}

export const Tabs = ({ items, defaultIndex = 0, onChange, orientation = "horizontal", className }: TabsProps) => {
  return (
    <div className={`${orientation === "vertical" ? "flex space-x-4" : ""} ${className}`}>
      <Tab.Group defaultIndex={defaultIndex} onChange={onChange} vertical={orientation === "vertical"}>
        <Tab.List className={tabsListVariants({ orientation })}>
          {items.map((item, index) => (
            <Tab
              key={index}
              disabled={item.disabled}
              className={({ selected }) =>
                `${tabVariants({ orientation })} ${selected ? "text-y2k-blue" : "text-gray-600"} ${item.disabled ? "opacity-50 cursor-not-allowed" : ""}`
              }
            >
              {item.label}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className={tabPanelsVariants({ orientation })}>
          {items.map((item, index) => (
            <Tab.Panel key={index} className="p-4 focus:outline-none">
              {item.content}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

