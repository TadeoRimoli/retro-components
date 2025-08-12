
import React from "react"
import { Disclosure, Transition } from "@headlessui/react"

export interface AccordionItem {
  title: React.ReactNode
  content: React.ReactNode
  disabled?: boolean
}

export interface AccordionProps {
  items: AccordionItem[]
  defaultOpen?: number[]
  allowMultiple?: boolean
  className?: string
}

export const Accordion = ({ items, defaultOpen = [], allowMultiple = false, className }: AccordionProps) => {
  const [openItems, setOpenItems] = React.useState<number[]>(defaultOpen)

  const toggleItem = (index: number) => {
    if (allowMultiple) {
      setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
    } else {
      setOpenItems((prev) => (prev.includes(index) ? [] : [index]))
    }
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="border-2 border-y2k-silver-light rounded-lg overflow-hidden shadow-y2k-card">
          <Disclosure defaultOpen={defaultOpen.includes(index)}>
            {({ open }) => (
              <>
                <Disclosure.Button
                  className={`w-full px-6 py-4 flex justify-between items-center
                           bg-gradient-to-r from-y2k-silver-light/50 to-transparent
                           text-left text-gray-800 font-bold font-y2k
                           ${item.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={item.disabled}
                  onClick={() => !item.disabled && toggleItem(index)}
                >
                  <span>{item.title}</span>
                  <svg
                    className={`w-5 h-5 transform ${open ? "rotate-180" : ""} transition-transform`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Disclosure.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel className="px-6 py-4 border-t border-y2k-silver-light">
                    {item.content}
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        </div>
      ))}
    </div>
  )
}

