"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"
import { ChevronDown, ChevronRight, Folder, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import type { Folder as FolderType } from "@/types/bookmark"

interface SidebarProps {
  folders: FolderType[]
  activeFolder: string | null
  onFolderSelect: (folderId: string | null, folderName: string) => void
  onAddFolder: () => void
  className?: string
  onClose?: () => void
  isMobile?: boolean
}

function Sidebar({
  folders,
  activeFolder,
  onFolderSelect,
  onAddFolder,
  className,
  onClose,
  isMobile = false,
}: SidebarProps) {
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({})

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }))
  }

  // Get child folders
  const getChildFolders = (parentId: string | null) => {
    return folders.filter((folder) => folder.parentId === parentId)
  }

  // Recursive function to render folder tree
  const renderFolderTree = (parentId: string | null, level = 0) => {
    const foldersToRender = getChildFolders(parentId)

    return foldersToRender.map((folder) => {
      const childFolders = getChildFolders(folder.id)
      const hasChildren = childFolders.length > 0
      const isExpanded = expandedFolders[folder.id]

      return (
        <div key={folder.id} style={{ paddingLeft: `${level * 12}px` }}>
          <Collapsible open={isExpanded} onOpenChange={() => toggleFolder(folder.id)}>
            <CollapsibleTrigger asChild>
              <Button
                variant={activeFolder === folder.id ? "secondary" : "ghost"}
                size="sm"
                className="w-full justify-between h-8 px-2"
                onClick={() => {
                  onFolderSelect(folder.id, folder.name)
                  if (isMobile && onClose) {
                    onClose()
                  }
                }}
              >
                <div className="flex items-center">
                  <Folder className="mr-2 h-4 w-4" />
                  <span className="text-sm truncate">{folder.name}</span>
                </div>
                {hasChildren && (
                  <div className="flex items-center">
                    {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </div>
                )}
              </Button>
            </CollapsibleTrigger>
            {hasChildren && <CollapsibleContent>{renderFolderTree(folder.id, level + 1)}</CollapsibleContent>}
          </Collapsible>
        </div>
      )
    })
  }

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="font-semibold">Folders</h2>
        {isMobile && onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        )}
      </div>

      {/* Folder Tree */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          <Button
            variant={activeFolder === null ? "secondary" : "ghost"}
            size="sm"
            className="w-full justify-start mb-2"
            onClick={() => {
              onFolderSelect(null, "All Bookmarks")
              if (isMobile && onClose) {
                onClose()
              }
            }}
          >
            <Folder className="mr-2 h-4 w-4" />
            All Bookmarks
          </Button>
          {renderFolderTree(null)}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => {
            onAddFolder()
            if (isMobile && onClose) {
              onClose()
            }
          }}
        >
          <Folder className="mr-2 h-4 w-4" />
          New Folder
        </Button>
      </div>
    </div>
  )
}

export default Sidebar