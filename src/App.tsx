"use client"

import { useState, useEffect } from "react"
import { useMediaQuery } from "./hooks/use-media-query"
import { cn } from "./lib/utils"
import {Header} from "@/components/header"
import Sidebar from "@/components/sidebar"
import BookmarkGrid from "@/components/bookmark-grid"
import AddBookmarkDialog from "@/components/add-bookmark-dialog"
import AddFolderDialog from "@/components/add-folder-dialog"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import type { Bookmark, Folder } from "@/types/bookmark"
import { mockBookmarks, mockFolders } from "@/lib/data"
import ThemeProvider  from "@/components/theme-provider"

export default function App() {
  // State
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFolder, setActiveFolder] = useState<string | null>(null)
  const [activeFolderName, setActiveFolderName] = useState("All Bookmarks")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isAddBookmarkOpen, setIsAddBookmarkOpen] = useState(false)
  const [isAddFolderOpen, setIsAddFolderOpen] = useState(false)
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [folders, setFolders] = useState<Folder[]>([])

  // Initialize with mock data
  useEffect(() => {
    setBookmarks(mockBookmarks)
    setFolders(mockFolders)
  }, [])

  // Check if we're on mobile
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Filter bookmarks based on search and active folder
  const filteredBookmarks = bookmarks.filter((bookmark) => {
    const matchesSearch =
      searchQuery === "" ||
      bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (bookmark.description && bookmark.description.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesFolder = activeFolder === null || bookmark.folderId === activeFolder

    return matchesSearch && matchesFolder
  })

  // Handlers
  const handleFolderSelect = (folderId: string | null, folderName: string) => {
    setActiveFolder(folderId)
    setActiveFolderName(folderName)
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  const handleAddBookmark = (bookmark: Bookmark) => {
    setBookmarks((prev) => [
      ...prev,
      {
        ...bookmark,
        id: String(prev.length + 1),
        createdAt: new Date().toISOString(),
      },
    ])
    setIsAddBookmarkOpen(false)
  }

  const handleAddFolder = (name: string, parentId: string | null) => {
    const newFolder: Folder = {
      id: String(folders.length + 1),
      name,
      parentId,
      count: 0, // Add count property
    }
    setFolders((prev) => [...prev, newFolder])
    setIsAddFolderOpen(false)
  }

  const handleToggleFavorite = (id: string) => {
    setBookmarks((prev) =>
      prev.map((bookmark) => (bookmark.id === id ? { ...bookmark, isFavorite: !bookmark.isFavorite } : bookmark)),
    )
  }

  const handleDeleteBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id))
  }

  return (
    <ThemeProvider attribute="class">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar - Hidden on mobile, shown through Sheet */}
        <aside className={cn("w-64 border-r bg-background hidden md:block", isMobile && "hidden")}>
          <Sidebar
            folders={folders}
            activeFolder={activeFolder}
            onFolderSelect={handleFolderSelect}
            onAddFolder={() => setIsAddFolderOpen(true)}
          />
        </aside>

        {/* Mobile Sidebar */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="p-0 w-[240px]">
            <Sidebar
              folders={folders}
              activeFolder={activeFolder}
              onFolderSelect={handleFolderSelect}
              onAddFolder={() => setIsAddFolderOpen(true)}
              isMobile={true}
              onClose={() => setSidebarOpen(false)}
            />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <Header
            onAddBookmark={() => setIsAddBookmarkOpen(true)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sidebarOpen={sidebarOpen}
            onSidebarOpenChange={setSidebarOpen}
          />

          <div className="flex-1 overflow-auto p-4">
            <div className="container">
              <h1 className="text-2xl font-bold mb-4">{activeFolderName}</h1>

              <BookmarkGrid
                bookmarks={filteredBookmarks}
                onToggleFavorite={handleToggleFavorite}
                onDelete={handleDeleteBookmark}
              />
            </div>
          </div>
        </main>

        {/* Dialogs */}
        <AddBookmarkDialog
          open={isAddBookmarkOpen}
          onOpenChange={setIsAddBookmarkOpen}
          folders={folders}
          onAdd={handleAddBookmark}
          currentFolderId={activeFolder}
        />

        <AddFolderDialog
          open={isAddFolderOpen}
          onOpenChange={setIsAddFolderOpen}
          folders={folders}
          onAdd={handleAddFolder}
          currentFolderId={activeFolder}
        />
      </div>
    </ThemeProvider>
  )
}

