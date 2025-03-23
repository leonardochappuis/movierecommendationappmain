"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface MoviePaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function MoviePagination({ currentPage, totalPages, onPageChange }: MoviePaginationProps) {
  if (totalPages <= 1) return null

  return (
    <div className="flex justify-center items-center gap-2 mt-4 pb-4">
      <Button variant="outline" size="sm" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Show page numbers */}
      <div className="flex items-center gap-1">
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          // Show first page, last page, current page, and pages around current
          let pageToShow
          if (totalPages <= 5) {
            pageToShow = i + 1
          } else if (currentPage <= 3) {
            pageToShow = i + 1
          } else if (currentPage >= totalPages - 2) {
            pageToShow = totalPages - 4 + i
          } else {
            pageToShow = currentPage - 2 + i
          }

          if (pageToShow > 0 && pageToShow <= totalPages) {
            return (
              <Button
                key={pageToShow}
                variant={currentPage === pageToShow ? "default" : "outline"}
                size="sm"
                className="w-8 h-8 p-0"
                onClick={() => onPageChange(pageToShow)}
              >
                {pageToShow}
              </Button>
            )
          }
          return null
        })}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

