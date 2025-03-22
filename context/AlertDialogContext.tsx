"use client"
import { createContext, useContext, useState, type ReactNode } from "react"

interface AlertDialogOptions {
  title: string
  description: string
  onConfirm: () => void
}

interface AlertDialogContextType {
  showDialog: (options: AlertDialogOptions) => void
  hideDialog: () => void
  isOpen: boolean
  options: AlertDialogOptions | null
}

const AlertDialogContext = createContext<AlertDialogContextType | undefined>(undefined)

export function AlertDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [options, setOptions] = useState<AlertDialogOptions | null>(null)

  const showDialog = (options: AlertDialogOptions) => {
    setOptions(options)
    setIsOpen(true)
  }

  const hideDialog = () => {
    setIsOpen(false)
    setOptions(null)
  }

  return (
    <AlertDialogContext.Provider value={{ isOpen, showDialog, hideDialog, options }}>
      {children}
    </AlertDialogContext.Provider>
  )
}

export function useAlertDialog() {
  const context = useContext(AlertDialogContext)
  if (!context) {
    throw new Error("useAlertDialog must be used within an AlertDialogProvider")
  }
  return context
}

