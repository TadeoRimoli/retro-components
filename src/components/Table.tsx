"use client"

import React from "react"
import { cva, type VariantProps } from "class-variance-authority"

const tableVariants = cva(
  [
    "w-full border-collapse",
    "text-sm",
    "border-2 border-y2k-silver-light rounded-lg overflow-hidden",
    "shadow-y2k-card",
  ],
  {
    variants: {
      variant: {
        default: "",
        striped: "",
        bordered: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement>, VariantProps<typeof tableVariants> {}

const Table = React.forwardRef<HTMLTableElement, TableProps>(({ className, variant, ...props }, ref) => {
  return (
    <div className="w-full overflow-auto">
      <table ref={ref} className={tableVariants({ variant, className })} {...props} />
    </div>
  )
})

Table.displayName = "Table"

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={`bg-gradient-to-r from-y2k-silver-light to-white ${className}`} {...props} />
  ),
)

TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement> & { striped?: boolean }
>(({ className, striped, ...props }, ref) => (
  <tbody
    ref={ref}
    className={`${striped ? "[&>tr:nth-child(even)]:bg-y2k-silver-light/30" : ""} ${className}`}
    {...props}
  />
))

TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={`bg-gradient-to-r from-white to-y2k-silver-light/50 border-t-2 border-y2k-silver-light ${className}`}
      {...props}
    />
  ),
)

TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & { highlighted?: boolean }
>(({ className, highlighted, ...props }, ref) => (
  <tr
    ref={ref}
    className={`border-b border-y2k-silver-light hover:bg-y2k-silver-light/20 transition-colors
              ${highlighted ? "bg-y2k-blue-light/10" : ""} ${className}`}
    {...props}
  />
))

TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th ref={ref} className={`px-4 py-3 text-left font-bold font-y2k text-gray-700 ${className}`} {...props} />
  ),
)

TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={`px-4 py-3 border-r last:border-r-0 border-y2k-silver-light/30 ${className}`} {...props} />
  ),
)

TableCell.displayName = "TableCell"

const TablePagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t-2 border-y2k-silver-light bg-gradient-to-r from-white to-y2k-silver-light/30">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border-2 border-y2k-silver rounded-md shadow-y2k-button
                disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <span className="text-sm font-y2k">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border-2 border-y2k-silver rounded-md shadow-y2k-button
                disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  )
}

TablePagination.displayName = "TablePagination"

export { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TablePagination }

