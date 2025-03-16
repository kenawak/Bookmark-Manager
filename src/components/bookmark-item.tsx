"use client"

import { useState } from "react"
import { MoreHorizontal, Trash2, Edit, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Bookmark } from "@/types/bookmark"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface BookmarkItemProps {
  bookmark: Bookmark
  onDelete: (id: string) => void
}

export default function BookmarkItem({ bookmark, onDelete }: BookmarkItemProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(bookmark.url)
  }

  // Extract domain from URL
  const getDomain = (url: string) => {
    try {
      const domain = new URL(url).hostname.replace("www.", "")
      return domain
    } catch (e) {
      return url
    }
  }

  // Get initials for avatar fallback
  const getInitials = (title: string) => {
    return title.substring(0, 1).toUpperCase()
  }

  // Open bookmark in new tab
  const openBookmark = () => {
    window.open(bookmark.url, "_blank")
  }

  return (
    <div
      className="flex items-center py-1 px-2 rounded-md hover:bg-muted/50 transition-colors cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={openBookmark}
    >
      <Avatar className="h-6 w-6 mr-2 shrink-0">
        <AvatarImage src={bookmark.favicon} alt={bookmark.title} />
        <AvatarFallback style={{ backgroundColor: bookmark.color }} className="text-[10px] text-white">
          {getInitials(bookmark.title)}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate">{bookmark.title}</div>
        <div className="text-xs text-muted-foreground truncate">{getDomain(bookmark.url)}</div>
      </div>

      <div
        className={cn("opacity-0 group-hover:opacity-100 transition-opacity", isHovered ? "opacity-100" : "opacity-0")}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation()
                handleCopyUrl()
              }}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy URL
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={(e) => {
                e.stopPropagation()
                onDelete(bookmark.id)
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

