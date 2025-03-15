"use client"

import { ExternalLink, Star, MoreHorizontal, Trash2, Edit, Copy, Share2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/hooks/use-toast"
import type { Bookmark } from "@/types/bookmark"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface BookmarkCardProps {
  bookmark: Bookmark
  onToggleFavorite: (id: string) => void
  onDelete: (id: string) => void
}

export default function BookmarkCard({ bookmark, onToggleFavorite, onDelete }: BookmarkCardProps) {
  // const [isHovered, setIsHovered] = useState(false)

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(bookmark.url)
    toast({
      title: "URL copied",
      description: "The bookmark URL has been copied to your clipboard.",
      // Remove variant if not supported
      // variant: "destructive",
    })
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: bookmark.title,
          text: bookmark.description || bookmark.title,
          url: bookmark.url,
        })
        toast({
          title: "Shared successfully",
          description: "The bookmark has been shared.",
          // Remove variant if not supported
          // variant: "destructive",
        })
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          toast({
            title: "Sharing failed",
            description: "There was an error sharing this bookmark.",
            // Remove variant if not supported
            // variant: "destructive",
          })
        }
      }
    } else {
      handleCopyUrl()
    }
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

  // Get initials for avatar fallback
  const getInitials = (title: string) => {
    return title ? title.substring(0, 1).toUpperCase() : "B"
  }

  return (
    <Card
      className="overflow-hidden transition-all duration-200 hover:shadow-md"
      // onMouseEnter={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <Avatar className="h-10 w-10 flex-shrink-0">
            <AvatarImage src={bookmark.favicon} alt={bookmark.title} />
            <AvatarFallback style={{ backgroundColor: bookmark.color }} className="text-white">
              {getInitials(bookmark.title)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <h3 className="font-medium line-clamp-1">{bookmark.title}</h3>
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:underline flex items-center"
            >
              {getDomain(bookmark.url)}
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8 text-muted-foreground", bookmark.isFavorite && "text-yellow-500")}
            onClick={() => onToggleFavorite(bookmark.id)}
          >
            <Star className={cn("h-4 w-4", bookmark.isFavorite && "fill-yellow-500")} />
            <span className="sr-only">Toggle favorite</span>
          </Button>
        </div>

        {bookmark.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{bookmark.description}</p>
        )}

        <div className="flex justify-between items-center mt-3">
          <span className="text-xs text-muted-foreground">Added {formatDate(bookmark.createdAt)}</span>

          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleShare} title="Share bookmark">
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Share</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleCopyUrl}>
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
        </div>
      </CardContent>
    </Card>
  )
}

