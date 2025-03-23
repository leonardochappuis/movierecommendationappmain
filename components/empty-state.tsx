"use client"

import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  message: string
  buttonText?: string
  onButtonClick?: () => void
}

export function EmptyState({ message, buttonText, onButtonClick }: EmptyStateProps) {
  return (
    <div className="text-center py-8">
      <p className="text-muted-foreground">{message}</p>
      {buttonText && onButtonClick && (
        <Button variant="outline" className="mt-4" onClick={onButtonClick}>
          {buttonText}
        </Button>
      )}
    </div>
  )
}

