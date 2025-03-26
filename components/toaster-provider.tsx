"use client"

import { Toaster } from "sonner"
import { useIsMobile } from "@/hooks/use-mobile"

export function ToasterProvider() {
  const isMobile = useIsMobile()

  return <Toaster position={isMobile ? "top-center" : "bottom-right"} />
}
