"use client"

import React from "react"


export interface BreadcrumbItem {
  label: React.ReactNode
  href?: string
  onClick?: () => void
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  separator?: React.ReactNode
  className?: string
}

export const Breadcrumb = ({ items, separator = "/", className }: BreadcrumbProps) => {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center space-x-2 text-sm">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="mx-2 text-gray-400">{separator}</span>}
            {index === items.length - 1 ? (
              <span className="font-bold text-gray-800">{item.label}</span>
            ) : item.href ? (
              <a
                href={item.href}
                onClick={(e) => {
                  if (item.onClick) {
                    e.preventDefault()
                    item.onClick()
                  }
                }}
                className="text-y2k-blue hover:underline"
              >
                {item.label}
              </a>
            ) : (
              <button onClick={item.onClick} className="text-y2k-blue hover:underline">
                {item.label}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

