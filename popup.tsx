"use client"

import { useState, useEffect } from "react"
import { Search, Plus, Folder, Settings, ChevronRight, ChevronDown, Menu, X } from "lucide-react"
import { Button } from "/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import ThemeToggle from "@/components/theme-toggle"
import BookmarkItem from "@/components/bookmark-item"
import AddBookmarkDialog from "@/components/add-bookmark-dialog"
import AddFolderDialog from "@/components/add-folder-dialog"
import type { Bookmark, Folder as FolderType } from "@/types/bookmark"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function BookmarkExtension() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFolder, setActiveFolder] = useState<string | null>(null)
  const [isAddBookmarkDialogOpen, setIsAddBookmarkDialogOpen] = useState(false)
  const [isAddFolderDialogOpen, setIsAddFolderDialogOpen] = useState(false)
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [folders, setFolders] = useState<FolderType[]>([])
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({})
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeFolderName, setActiveFolderName] = useState<string>("All Bookmarks")
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [debugMode, setDebugMode] = useState(false)

  // Mock data initialization
  useEffect(() => {
    // This would be replaced with actual Chrome bookmarks API in a real extension
    const mockFolders: FolderType[] = [
      { id: "1", name: "Work", parentId: null },
      { id: "2", name: "Personal", parentId: null },
      { id: "3", name: "Shopping", parentId: null },
      { id: "4", name: "Development", parentId: "1" },
      { id: "5", name: "Design", parentId: "1" },
      { id: "6", name: "Finance", parentId: "2" },
      { id: "7", name: "Travel", parentId: "2" },
    ]

    const mockBookmarks: Bookmark[] = [
      {
        id: "1",
        title: "Google",
        url: "https://google.com",
        folderId: "1",
        favicon: "https://www.google.com/favicon.ico",
        color: "#4285F4",
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        title: "GitHub",
        url: "https://github.com",
        url: "https://github.com",
        folderId: "4",
        favicon: "https://github.com/favicon.ico",
        color: "#24292e",
        createdAt: new Date().toISOString(),
      },
      {
        id: "3",
        title: "Figma",
        url: "https://figma.com",
        folderId: "5",
        favicon: "https://static.figma.com/app/icon/1/favicon.png",
        color: "#a259ff",
        createdAt: new Date().toISOString(),
      },
      {
        id: "4",
        title: "Amazon",
        url: "https://amazon.com",
        folderId: "3",
        favicon: "https://www.amazon.com/favicon.ico",
        color: "#ff9900",
        createdAt: new Date().toISOString(),
      },
      {
        id: "5",
        title: "Netflix",
        url: "https://netflix.com",
        folderId: "2",
        favicon: "https://www.netflix.com/favicon.ico",
        color: "#e50914",
        createdAt: new Date().toISOString(),
      },
      {
        id: "6",
        title: "Bank of America",
        url: "https://bankofamerica.com",
        folderId: "6",
        favicon: "https://www.bankofamerica.com/favicon.ico",
        color: "#012169",
        createdAt: new Date().toISOString(),
      },
      {
        id: "7",
        title: "Airbnb",
        url: "https://airbnb.com",
        folderId: "7",
        favicon: "https://www.airbnb.com/favicon.ico",
        color: "#ff5a5f",
        createdAt: new Date().toISOString(),
      },
      {
        id: "8",
        title: "Stack Overflow",
        url: "https://stackoverflow.com",
        folderId: "4",
        favicon: "https://stackoverflow.com/favicon.ico",
        color: "#f48024",
        createdAt: new Date().toISOString(),
      },
    ]

    setFolders(mockFolders)
    setBookmarks(mockBookmarks)

    // Initialize root folders as expanded
    const initialExpandedState: Record<string, boolean> = {}
    mockFolders
      .filter((folder) => folder.parentId === null)
      .forEach((folder) => {
        initialExpandedState[folder.id] = true
      })
    setExpandedFolders(initialExpandedState)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 320)
    }

    // Set initial value
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Clean up event listener
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (isSmallScreen) {
      // Add a style tag to handle extremely small widths
      const style = document.createElement("style")
      style.innerHTML = `
        .bookmark-extension-container {
          min-width: 280px !important;
        }
        .bookmark-extension-header {
          padding-left: 2px !important;
          padding-right: 2px !important;
        }
        .bookmark-extension-header .header-title {
          font-size: 0.875rem !important;
        }
      `
      document.head.appendChild(style)

      return () => {
        document.head.removeChild(style)
      }
    }
  }, [isSmallScreen])

  const toggleFolderExpanded = (folderId: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }))
  }

  const handleAddBookmark = (newBookmark: Bookmark) => {
    setBookmarks((prev) => [
      ...prev,
      {
        ...newBookmark,
        id: String(prev.length + 1),
        createdAt: new Date().toISOString(),
      },
    ])
    setIsAddBookmarkDialogOpen(false)
  }

  const handleAddFolder = (name: string, parentId: string | null) => {
    const newFolder: FolderType = {
      id: String(folders.length + 1),
      name,
      parentId,
    }
    setFolders((prev) => [...prev, newFolder])
    setIsAddFolderDialogOpen(false)

    // Expand parent folder if it exists
    if (parentId) {
      setExpandedFolders((prev) => ({
        ...prev,
        [parentId]: true,
      }))
    }
  }

  const deleteBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id))
  }

  // Get root folders (no parent)
  const rootFolders = folders.filter((folder) => folder.parentId === null)

  // Get child folders for a parent
  const getChildFolders = (parentId: string) => {
    return folders.filter((folder) => folder.parentId === parentId)
  }

  // Get bookmarks for a folder
  const getFolderBookmarks = (folderId: string) => {
    return bookmarks.filter((bookmark) => bookmark.folderId === folderId)
  }

  // Filter bookmarks based on search
  const filteredBookmarks = bookmarks.filter((bookmark) => {
    const matchesSearch =
      searchQuery === "" ||
      bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.url.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFolder = activeFolder === null || bookmark.folderId === activeFolder

    return matchesSearch && matchesFolder
  })

  // Handle folder selection
  const handleFolderSelect = (folderId: string | null, folderName: string) => {
    setActiveFolder(folderId)
    setActiveFolderName(folderName)
    setSidebarOpen(false) // Close sidebar after selection on mobile
  }

  // Recursive function to render folder tree
  const renderFolderTree = (parentId: string | null) => {
    const foldersToRender = folders.filter((folder) => folder.parentId === parentId)

    return foldersToRender.map((folder) => {
      const childFolders = getChildFolders(folder.id)
      const folderBookmarks = getFolderBookmarks(folder.id)
      const hasChildren = childFolders.length > 0 || folderBookmarks.length > 0

      return (
        <div key={folder.id} className="pl-[10px]">
          <Collapsible open={expandedFolders[folder.id]} className="w-full">
            <CollapsibleTrigger asChild>
              <Button
                variant={activeFolder === folder.id ? "secondary" : "ghost"}
                size="sm"
                className="w-full justify-between h-8 px-2"
                onClick={() => {
                  handleFolderSelect(folder.id, folder.name)
                  toggleFolderExpanded(folder.id)
                }}
              >
                <div className="flex items-center">
                  <Folder className="mr-2 h-4 w-4" />
                  <span className="text-sm truncate">{folder.name}</span>
                </div>
                {hasChildren && (
                  <div className="flex items-center">
                    {expandedFolders[folder.id] ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </div>
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="pl-2">
                {/* Render child folders recursively */}
                {childFolders.length > 0 && renderFolderTree(folder.id)}

                {/* Render bookmarks in this folder */}
                {folderBookmarks.map((bookmark) => (
                  <BookmarkItem key={bookmark.id} bookmark={bookmark} onDelete={deleteBookmark} />
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )
    })
  }

  const toggleDebugMode = () => {
    setDebugMode((prev) => !prev)
  }

  // Add a hidden debug button that can be activated with a keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Shift+D to toggle debug mode
      if (e.ctrlKey && e.shiftKey && e.key === "D") {
        toggleDebugMode()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <div className="flex flex-col h-[600px] w-[350px] min-w-[300px] bg-background overflow-hidden bookmark-extension-container">
      {/* Header */}
      <header className="h-12 border-b border-border flex items-center px-2 shrink-0 bookmark-extension-header">
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 mr-1 flex-shrink-0 bookmark-sheet-trigger">
              <Menu className="h-4 w-4" />
              <span className="sr-only">Toggle folders</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px] p-0">
            <div className="flex flex-col h-full">
              <div className="p-4 border-b flex items-center justify-between">
                <h2 className="font-semibold">Folders</h2>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSidebarOpen(false)}>
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
              <ScrollArea className="flex-1">
                <div className="p-3">
                  <Button
                    variant={activeFolder === null ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start mb-2"
                    onClick={() => handleFolderSelect(null, "All Bookmarks")}
                  >
                    <Folder className="mr-2 h-4 w-4" />
                    All Bookmarks
                  </Button>
                  {renderFolderTree(null)}
                </div>
              </ScrollArea>
              <div className="p-3 border-t">
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setIsAddFolderDialogOpen(true)
                    setSidebarOpen(false)
                  }}
                >
                  <Folder className="h-4 w-4 mr-2" />
                  New Folder
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex-1 min-w-0 mx-1">
          <h1 className="text-lg font-semibold truncate header-title">{activeFolderName}</h1>
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
            <span className="sr-only">Settings</span>
          </Button>
        </div>
      </header>

      {/* Search */}
      <div className="p-3 border-b border-border">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bookmarks..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <ScrollArea className="flex-1">
          <div className="p-3">
            {filteredBookmarks.length > 0 ? (
              <div className="space-y-1">
                {filteredBookmarks.map((bookmark) => (
                  <BookmarkItem key={bookmark.id} bookmark={bookmark} onDelete={deleteBookmark} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">No bookmarks found</div>
            )}
          </div>
        </ScrollArea>

        {/* Action buttons */}
        <div className="p-3 border-t border-border flex justify-end">
          <Button size="sm" onClick={() => setIsAddBookmarkDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Bookmark
          </Button>
        </div>
      </div>

      <AddBookmarkDialog
        open={isAddBookmarkDialogOpen}
        onOpenChange={setIsAddBookmarkDialogOpen}
        onAdd={handleAddBookmark}
        folders={folders}
        currentFolderId={activeFolder}
      />

      <AddFolderDialog
        open={isAddFolderDialogOpen}
        onOpenChange={setIsAddFolderDialogOpen}
        onAdd={handleAddFolder}
        folders={folders}
        currentFolderId={activeFolder}
      />
      {debugMode && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 pointer-events-none z-50 flex items-center justify-center">
          <div className="bg-background p-4 rounded-md text-xs">
            <p>Width: {window.innerWidth}px</p>
            <p>Menu button visible: {document.querySelector(".bookmark-sheet-trigger") ? "Yes" : "No"}</p>
            <p>Active folder: {activeFolderName}</p>
          </div>
        </div>
      )}
    </div>
  )
}

