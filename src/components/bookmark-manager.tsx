"use client"

import { useState, useEffect } from "react"
import { Search, Plus, Grid3X3, List, Star, Folder, Tag, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import ThemeToggle from "@/components/theme-toggle"
import BookmarkCard from "@/components/bookmark-card"
import BookmarkList from "@/components/bookmark-list"
import AddBookmarkDialog from "@/components/add-bookmark-dialog"
import type { Bookmark, Folder as FolderType } from "@/types/bookmark"

export default function BookmarkManager() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFolder, setActiveFolder] = useState<string | null>(null)
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [folders, setFolders] = useState<FolderType[]>([])
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({})

  // Mock data initialization
  useEffect(() => {
    const mockFolders: FolderType[] = [
      { id: "1", name: "Frontend", parentId: null, count: 3 },
      { id: "2", name: "Backend", parentId: null, count: 1 },
      { id: "3", name: "DevOps", parentId: null, count: 1 },
      { id: "4", name: "Design", parentId: "1", count: 0 },
      { id: "5", name: "Learning", parentId: null, count: 0 },
    ]

    const mockBookmarks: Bookmark[] = [
      {
        id: "1",
        title: "Next.js Documentation",
        url: "https://nextjs.org/docs",
        tags: ["frontend", "react", "documentation"],
        folderId: "1",
        createdAt: new Date().toISOString(),
        isFavorite: true,
        favicon: "",
        color: "#4285F4",
      },
      {
        id: "2",
        title: "Tailwind CSS",
        url: "https://tailwindcss.com",
        tags: ["css", "frontend", "styling"],
        folderId: "1",
        createdAt: new Date().toISOString(),
        isFavorite: true,
        favicon: "",
        color: "#4285F4",
      },
      {
        id: "3",
        title: "Node.js Documentation",
        url: "https://nodejs.org/en/docs",
        tags: ["backend", "javascript", "documentation"],
        folderId: "2",
        createdAt: new Date().toISOString(),
        isFavorite: false,
        favicon: "",
        color: "",
      },
      {
        id: "4",
        title: "Docker Documentation",
        url: "https://docs.docker.com",
        tags: ["devops", "containers", "documentation"],
        folderId: "3",
        createdAt: new Date().toISOString(),
        isFavorite: false,
        favicon: "",
        color: "",
      },
      {
        id: "5",
        title: "Figma",
        url: "https://figma.com",
        tags: ["design", "ui", "tool"],
        folderId: "4",
        createdAt: new Date().toISOString(),
        isFavorite: true,
        favicon: "",
        color: "",
      },
      {
        id: "6",
        title: "TypeScript Handbook",
        url: "https://www.typescriptlang.org/docs/handbook/intro.html",
        tags: ["typescript", "frontend", "documentation"],
        folderId: "1",
        createdAt: new Date().toISOString(),
        isFavorite: false,
        favicon: "",
        color: "",
      },
      {
        id: "7",
        title: "MDN Web Docs",
        url: "https://developer.mozilla.org",
        tags: ["frontend", "documentation", "reference"],
        folderId: "1",
        createdAt: new Date().toISOString(),
        isFavorite: true,
        favicon: "",
        color: "",
      },
      {
        id: "8",
        title: "GitHub",
        url: "https://github.com",
        tags: ["git", "collaboration", "code"],
        folderId: "5",
        createdAt: new Date().toISOString(),
        isFavorite: true,
        favicon: "",
        color: "",
      },
    ]

    setFolders(mockFolders)
    setBookmarks(mockBookmarks)

    // Initialize all folders as expanded
    const initialExpandedState: Record<string, boolean> = {}
    mockFolders.forEach((folder) => {
      initialExpandedState[folder.id] = true
    })
    setExpandedFolders(initialExpandedState)
  }, [])

  const toggleFolderExpanded = (folderId: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }))
  }

  const handleAddBookmark = (newBookmark: Bookmark) => {
    setBookmarks((prev) => [
      ...prev,
      { ...newBookmark, id: String(prev.length + 1), createdAt: new Date().toISOString() },
    ])
    setIsAddDialogOpen(false)
  }

  const toggleFavorite = (id: string) => {
    setBookmarks((prev) =>
      prev.map((bookmark) => (bookmark.id === id ? { ...bookmark, isFavorite: !bookmark.isFavorite } : bookmark)),
    )
  }

  const deleteBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id))
  }

  // Filter bookmarks based on search, folder, and tag
  const filteredBookmarks = bookmarks.filter((bookmark) => {
    const matchesSearch =
      searchQuery === "" ||
      bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (bookmark.tags && bookmark.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())))

    const matchesFolder = activeFolder === null || bookmark.folderId === activeFolder
    const matchesTag = activeTag === null || (bookmark.tags && bookmark.tags.includes(activeTag))

    return matchesSearch && matchesFolder && matchesTag
  })

  // Get all unique tags from bookmarks
  const allTags = Array.from(new Set(bookmarks.flatMap((bookmark) => bookmark.tags || [])))

  // Get favorite bookmarks
  const favoriteBookmarks = bookmarks.filter((bookmark) => bookmark.isFavorite)

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r border-border bg-card hidden md:block">
        <div className="p-4 flex items-center justify-between border-b border-border">
          <h1 className="text-xl font-semibold font-mono">Bookmarks</h1>
          <ThemeToggle />
        </div>

        <ScrollArea className="h-[calc(100vh-64px)]">
          <div className="p-4">
            <Button
              variant="outline"
              className="w-full justify-start mb-4"
              onClick={() => {
                setActiveFolder(null)
                setActiveTag(null)
              }}
            >
              <Star className="mr-2 h-4 w-4" />
              All Bookmarks
            </Button>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-semibold text-muted-foreground">FAVORITES</h2>
              </div>
              <div className="space-y-1">
                {favoriteBookmarks.map((bookmark) => (
                  <Button
                    key={bookmark.id}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-xs"
                    onClick={() => {
                      setSearchQuery(bookmark.title)
                    }}
                  >
                    <div className="truncate">{bookmark.title}</div>
                  </Button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-semibold text-muted-foreground">FOLDERS</h2>
              </div>
              <div className="space-y-1">
                {folders.map((folder) => (
                  <Collapsible key={folder.id} open={expandedFolders[folder.id]} className="w-full">
                    <CollapsibleTrigger asChild>
                      <Button
                        variant={activeFolder === folder.id ? "secondary" : "ghost"}
                        size="sm"
                        className="w-full justify-between"
                        onClick={() => {
                          setActiveFolder((prev) => (prev === folder.id ? null : folder.id))
                          setActiveTag((prev) => (prev === folder.id ? null : folder.id as string))
                          toggleFolderExpanded(folder.id)
                        }}
                      >
                        <div className="flex items-center">
                          <Folder className="mr-2 h-4 w-4" />
                          <span>{folder.name}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs text-muted-foreground mr-2">{folder.count}</span>
                          {expandedFolders[folder.id] ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </div>
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="pl-6 pt-1 space-y-1">
                        {bookmarks
                          .filter((bookmark) => bookmark.folderId === folder.id)
                          .map((bookmark) => (
                            <Button
                              key={bookmark.id}
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start text-xs"
                              onClick={() => {
                                setSearchQuery(bookmark.title)
                              }}
                            >
                              <div className="truncate">{bookmark.title}</div>
                            </Button>
                          ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-semibold text-muted-foreground">TAGS</h2>
              </div>
              <div className="space-y-1">
                {allTags.map((tag) => (
                  <Button
                    key={tag}
                    variant={activeTag === tag ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      setActiveTag((prev) => (prev === tag ? null : tag as string))
                      setActiveFolder(null)
                    }}
                  >
                    <Tag className="mr-2 h-4 w-4" />
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-border flex items-center justify-between px-4">
          <div className="flex items-center w-full max-w-md">
            <Search className="h-4 w-4 text-muted-foreground absolute ml-3" />
            <Input
              placeholder="Search bookmarks..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <div className="border rounded-md p-1 flex">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
                <span className="sr-only">Grid view</span>
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
                <span className="sr-only">List view</span>
              </Button>
            </div>

            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Bookmark
            </Button>

            <div className="md:hidden">
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4">
          <div className="mb-4">
            <h1 className="text-2xl font-bold font-mono">
              {activeFolder
                ? folders.find((f) => f.id === activeFolder)?.name
                : activeTag
                  ? `#${activeTag}`
                  : "All Bookmarks"}
            </h1>
            <p className="text-muted-foreground">
              {filteredBookmarks.length} bookmark{filteredBookmarks.length !== 1 ? "s" : ""}
            </p>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredBookmarks.map((bookmark) => (
                <BookmarkCard
                  key={bookmark.id}
                  bookmark={bookmark}
                  onToggleFavorite={toggleFavorite}
                  onDelete={deleteBookmark}
                />
              ))}
            </div>
          ) : (
            <BookmarkList bookmarks={filteredBookmarks} onToggleFavorite={toggleFavorite} onDelete={deleteBookmark} />
          )}

          {filteredBookmarks.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <p className="text-muted-foreground mb-4">No bookmarks found</p>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Bookmark
              </Button>
            </div>
          )}
        </div>
      </div>

      <AddBookmarkDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAdd={handleAddBookmark}
        folders={folders}
        currentFolderId={activeFolder}
        existingTags={allTags}
      />
    </div>
  )
}

