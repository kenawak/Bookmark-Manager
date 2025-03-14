"use client"

import { ExternalLink, Star, MoreHorizontal, Trash2, Edit, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Bookmark } from "@/types/bookmark"
import { cn } from "@/lib/utils"

interface BookmarkListProps {
  bookmarks: Bookmark[]
  onToggleFavorite: (id: string) => void
  onDelete: (id: string) => void
}

export default function BookmarkList({ bookmarks, onToggleFavorite, onDelete }: BookmarkListProps) {
  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
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

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="text-left p-3 font-medium text-muted-foreground">Title</th>
            <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">URL</th>
            <th className="text-left p-3 font-medium text-muted-foreground hidden lg:table-cell">Tags</th>
            <th className="text-left p-3 font-medium text-muted-foreground hidden sm:table-cell">Added</th>
            <th className="text-right p-3 font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookmarks.map((bookmark, index) => (
            <tr
              key={bookmark.id}
              className={cn("hover:bg-muted/50 transition-colors", index !== bookmarks.length - 1 && "border-b")}>
              <td className="p-3">
                <div className="font-medium">{bookmark.title}</div>
              </td>
              <td className="p-3 hidden md:table-cell">
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:underline flex items-center"
                >
                  {getDomain(bookmark.url)}
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </td>
              <td className="p-3 text-sm text-muted-foreground hidden sm:table-cell">
                {formatDate(bookmark.createdAt)}
              </td>
              <td className="p-3 text-right">
                <div className="flex items-center justify-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn("h-8 w-8 text-muted-foreground", bookmark.isFavorite && "text-yellow-500")}
                    onClick={() => onToggleFavorite(bookmark.id)}
                  >
                    <Star className={cn("h-4 w-4", bookmark.isFavorite && "fill-yellow-500")} />
                    <span className="sr-only">Toggle favorite</span>
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleCopyUrl(bookmark.url)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy URL
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => onDelete(bookmark.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

