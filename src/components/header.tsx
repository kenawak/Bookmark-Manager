"use client"

import { Menu, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ThemeToggle  from "./theme-toggle"

interface HeaderProps {
  onAddBookmark: () => void
  searchQuery: string
  onSearchChange: (value: string) => void
  sidebarOpen: boolean
  onSidebarOpenChange: (open: boolean) => void
}

export function Header({
  onAddBookmark,
  searchQuery,
  onSearchChange,
  sidebarOpen,
  onSidebarOpenChange,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4">
        {/* Sidebar Toggle Button - Always visible on mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 h-8 w-8 md:hidden"
          aria-label="Toggle sidebar"
          onClick={() => onSidebarOpenChange(!sidebarOpen)}
        >
          <Menu className="h-4 w-4" />
        </Button>

        {/* Search Bar */}
        <div className="flex items-center flex-1 gap-2">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search bookmarks..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 ml-2">
          <ThemeToggle />
          <Button onClick={onAddBookmark} size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add Bookmark
          </Button>
        </div>
      </div>
    </header>
  )
}

