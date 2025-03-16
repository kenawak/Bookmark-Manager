"use client"

import { Grid3X3, List } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ViewToggleProps {
  mode: "grid" | "list"
  onChange: (mode: "grid" | "list") => void
}

export default function ViewToggle({ mode, onChange }: ViewToggleProps) {
  return (
    <div className="border rounded-md p-1 flex">
      <Button
        variant={mode === "grid" ? "secondary" : "ghost"}
        size="icon"
        className="h-8 w-8"
        onClick={() => onChange("grid")}
      >
        <Grid3X3 className="h-4 w-4" />
        <span className="sr-only">Grid view</span>
      </Button>
      <Button
        variant={mode === "list" ? "secondary" : "ghost"}
        size="icon"
        className="h-8 w-8"
        onClick={() => onChange("list")}
      >
        <List className="h-4 w-4" />
        <span className="sr-only">List view</span>
      </Button>
    </div>
  )
}

