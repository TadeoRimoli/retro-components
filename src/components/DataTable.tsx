"use client"

import React, { useMemo, useState } from "react"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter, TablePagination } from "./Table"
import { Button } from "./Button"
import { Edit, Trash2, X, Save } from "lucide-react"
export interface Column<T> {
  header: React.ReactNode
  accessor: keyof T | ((row: T) => React.ReactNode)
  className?: string
}

export interface DataTableProps<T extends Record<string, any>> {
  columns: Column<T>[]
  data: T[]
  keyField: keyof T
  pagination?: boolean
  pageSize?: number
  striped?: boolean
  highlightOnHover?: boolean
  className?: string
  /** Acciones opcionales */
  onEdit?: (rowOriginal: T, rowEditado: T) => void
  onDelete?: (row: T) => void
  /** Qué columnas pueden editarse; por defecto todas las de tipo primitivo con accessor por clave */
  editableColumns?: (keyof T)[]
  /** Mostrar/ocultar la columna de acciones si existen callbacks */
  showActionsColumn?: boolean
  /** Texto de los botones (por si querés customizar copy) */
  labels?: {
    edit?: string
    save?: string
    cancel?: string
    delete?: string
  }
}

export function DataTable<T extends Record<string, any>>({
  columns = [],
  data = [],
  keyField,
  pagination = true,
  pageSize = 10,
  striped = true,
  highlightOnHover = true,
  className,
  onEdit,
  onDelete,
  editableColumns,
  showActionsColumn = true,
  labels,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1)
  const [editingId, setEditingId] = useState<string | number | null>(null)
  const [draft, setDraft] = useState<Partial<T>>({})

  // Ensure data is always an array
  const safeData = Array.isArray(data) ? data : []
  const safeColumns = Array.isArray(columns) ? columns : []

  // Calculate pagination with safeData
  const totalPages = Math.max(1, Math.ceil(safeData.length / pageSize))
  const paginatedData = pagination ? safeData.slice((currentPage - 1) * pageSize, currentPage * pageSize) : safeData

  // Columnas editables por default: accessor por clave y valor primitivo
  const defaultEditableCols = useMemo(() => {
    const keys = safeColumns
      .map(c => (typeof c.accessor === "string" ? (c.accessor as keyof T) : null))
      .filter(Boolean) as (keyof T)[]
    return keys
  }, [safeColumns])

  const canShowActions = showActionsColumn && (!!onEdit || !!onDelete)

  const isEditableKey = (key: keyof T) =>
    (editableColumns ?? defaultEditableCols).includes(key)

  const getCellValue = (row: T, column: Column<T>): React.ReactNode => {
    if (typeof column.accessor === "function") return column.accessor(row)
    return row[column.accessor] as React.ReactNode
  }

  const startEdit = (row: T) => {
    setEditingId(row[keyField] as any)
    setDraft({ ...row })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setDraft({})
  }

  const saveEdit = (rowOriginal: T) => {
    if (onEdit) {
      const merged = { ...rowOriginal, ...draft } as T
      onEdit(rowOriginal, merged)
    }
    setEditingId(null)
    setDraft({})
  }

  const handleDraftChange = (key: keyof T, value: any) => {
    setDraft(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className={`w-full ${className ?? ""}`}>
      <Table>
        <TableHeader>
          <TableRow>
            {safeColumns.map((column, index) => (
              <TableHead key={index} className={column.className}>
                {column.header}
              </TableHead>
            ))}
            {canShowActions && <TableHead className="w-0 whitespace-nowrap">Acciones</TableHead>}
          </TableRow>
        </TableHeader>

        <TableBody striped={striped}>
          {paginatedData.length > 0 ? (
            paginatedData.map((row) => {
              const rowId = row[keyField] as any
              const isEditing = editingId === rowId
              return (
                <TableRow
                  key={String(rowId)}
                  className={highlightOnHover ? "hover:bg-y2k-silver-light/30" : ""}
                >
                  {safeColumns.map((column, colIndex) => {
                    // Si la columna es por clave y está en edición, mostrar input
                    if (isEditing && typeof column.accessor === "string" && isEditableKey(column.accessor as keyof T)) {
                      const k = column.accessor as keyof T
                      const value = (draft[k] ?? row[k]) as any
                      const isNumber = typeof row[k] === "number"
                      return (
                        <TableCell key={colIndex} className={column.className}>
                          <input
                            className="w-full border rounded px-2 py-1 text-sm"
                            type={isNumber ? "number" : "text"}
                            value={value ?? ""}
                            onChange={(e) =>
                              handleDraftChange(k, isNumber ? Number(e.target.value) : e.target.value)
                            }
                          />
                        </TableCell>
                      )
                    }
                    // Caso normal (no edición o columna computada)
                    return (
                      <TableCell key={colIndex} className={column.className}>
                        {getCellValue(row, column)}
                      </TableCell>
                    )
                  })}

                  {canShowActions && (
                    <TableCell className="whitespace-nowrap">
                      {!isEditing ? (
                        <div className="flex gap-2">
                          {onEdit && (
                            <Button
                              variant="secondary"
                              onClick={() => startEdit(row)}
                              title="Editar"
                            >
                              <Edit size={16} />
                            </Button>
                          )}
                          {onDelete && (
                            <Button
                              variant="destructive"
                              onClick={() => onDelete(row)}
                              title="Eliminar"
                            >
                              <Trash2 size={16} />
                            </Button>
                          )}
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <Button
                            variant="secondary"
                            onClick={cancelEdit}
                            title="Cancelar"
                          >
                            <X size={16} />
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() => saveEdit(row)}
                            title="Guardar"
                          >
                            <Save size={16} />
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              )
            })
          ) : (
            <TableRow>
              <TableCell colSpan={safeColumns.length + (canShowActions ? 1 : 0)} className="text-center py-8 text-gray-500">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        {pagination && totalPages > 1 && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={safeColumns.length + (canShowActions ? 1 : 0)} className="p-0">
                <TablePagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  )
}
