import React from "react"
import { Disclosure, Transition } from "@headlessui/react"

export interface CollapsibleProps {
  title: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
  className?: string
}

export const Collapsible = ({ title, children, defaultOpen = false, className }: CollapsibleProps) => {
  return (
    <div className={`border-2 border-y2k-silver-light rounded-lg overflow-hidden shadow-y2k-card ${className}`}>
      <Disclosure defaultOpen={defaultOpen}>
        {({ open }) => (
          <>
            <Disclosure.Button
              className="w-full px-6 py-4 flex justify-between items-center
                       bg-gradient-to-r from-y2k-silver-light/50 to-transparent
                       text-left text-gray-800 font-bold font-y2k"
            >
              <span>{title}</span>
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
              <Disclosure.Panel className="px-6 py-4 border-t border-y2k-silver-light">{children}</Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  )
}

