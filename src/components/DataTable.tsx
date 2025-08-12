"use client"

import React from "react"
import { useState } from "react"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter, TablePagination } from "./Table"

export interface Column<T> {
  header: React.ReactNode
  accessor: keyof T | ((row: T) => React.ReactNode)
  className?: string
}

export interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  keyField: keyof T
  pagination?: boolean
  pageSize?: number
  striped?: boolean
  highlightOnHover?: boolean
  className?: string
}

export function DataTable<T>({
  columns = [],
  data = [],
  keyField,
  pagination = true,
  pageSize = 10,
  striped = true,
  highlightOnHover = true,
  className,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1)

  // Ensure data is always an array
  const safeData = Array.isArray(data) ? data : []
  const safeColumns = Array.isArray(columns) ? columns : []

  // Calculate pagination with safeData
  const totalPages = Math.max(1, Math.ceil(safeData.length / pageSize))
  const paginatedData = pagination ? safeData.slice((currentPage - 1) * pageSize, currentPage * pageSize) : safeData

  // Get cell value
  const getCellValue = (row: T, column: Column<T>) => {
    if (typeof column.accessor === "function") {
      return column.accessor(row)
    }
    return row[column.accessor] as React.ReactNode
  }

  return (
    <div className={`w-full ${className}`}>
      <Table>
        <TableHeader>
          <TableRow>
            {safeColumns.map((column, index) => (
              <TableHead key={index} className={column.className}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody striped={striped}>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, rowIndex) => (
              <TableRow key={String(row[keyField])} className={highlightOnHover ? "hover:bg-y2k-silver-light/30" : ""}>
                {safeColumns.map((column, colIndex) => (
                  <TableCell key={colIndex} className={column.className}>
                    {getCellValue(row, column)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={safeColumns.length} className="text-center py-8 text-gray-500">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {pagination && totalPages > 1 && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={safeColumns.length} className="p-0">
                <TablePagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  )
}

