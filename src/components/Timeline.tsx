import React from "react"

export interface TimelineItem {
  title: React.ReactNode
  content: React.ReactNode
  icon?: React.ReactNode
  date?: string
}

export interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

export const Timeline = ({ items, className }: TimelineProps) => {
  return (
    <div className={`relative ${className}`}>
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-y2k-blue via-y2k-silver to-y2k-pink"></div>

      {/* Items */}
      <div className="space-y-6">
      {items.map((item, index) => (
  <div key={index} className="relative pl-12">
    {/* Indicator circle with number */}
    <div className="absolute left-0 w-8 h-8 rounded-full bg-gradient-to-br from-y2k-silver-light to-white border-2 border-y2k-silver flex items-center justify-center shadow-y2k-outer text-sm font-semibold text-gray-800">
      {index + 1}
    </div>

    {/* Content */}
    <div className="bg-white border-2 border-y2k-silver-light rounded-lg shadow-y2k-card overflow-hidden">
      <div className="px-4 py-3 bg-gradient-to-r from-y2k-silver-light/50 to-transparent border-b border-y2k-silver-light flex justify-between items-center">
        <h3 className="font-bold font-y2k text-gray-800">
          {item.title}
        </h3>
        {item.date && <span className="text-sm text-gray-500">{item.date}</span>}
      </div>
      <div className="p-4">{item.content}</div>
    </div>
  </div>
))}

      </div>
    </div>
  )
}

