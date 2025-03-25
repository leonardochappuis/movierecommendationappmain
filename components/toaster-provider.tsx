"use client"

import { Toaster } from "sonner"
import { useIsMobile } from "@/components/ui/use-mobile"

export function ToasterProvider() {
  const isMobile = useIsMobile()

  return <Toaster position={isMobile ? "top-center" : "bottom-right"} />
}