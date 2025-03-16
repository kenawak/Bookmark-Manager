"use client"
import { Folder, ChevronDown, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import type { Folder as FolderType } from "@/types/bookmark"

interface FolderSidebarProps {
  folders: FolderType[]
  activeFolder: string | null
  expandedFolders: Record<string, boolean>
  onFolderSelect: (folderId: string | null, folderName: string) => void
  onToggleFolderExpanded: (folderId: string) => void
  onAddFolder: () => void
}

export default function FolderSidebar({
  folders,
  activeFolder,
  expandedFolders,
  onFolderSelect,
  onToggleFolderExpanded,
  onAddFolder,
}: FolderSidebarProps) {
  // Get child folders for a parent
  const getChildFolders = (parentId: string) => {
    return folders.filter((folder) => folder.parentId === parentId)
  }

  // Recursive function to render folder tree
  const renderFolderTree = (parentId: string | null) => {
    const foldersToRender = folders.filter((folder) => folder.parentId === parentId)

    return foldersToRender.map((folder) => {
      const childFolders = getChildFolders(folder.id)
      const hasChildren = childFolders.length > 0

      return (
        <div key={folder.id} className="pl-[10px]">
          <Collapsible open={expandedFolders[folder.id]} className="w-full">
            <CollapsibleTrigger asChild>
              <Button
                variant={activeFolder === folder.id ? "secondary" : "ghost"}
                size="sm"
                className="w-full justify-between h-8 px-2"
                onClick={() => {
                  onFolderSelect(folder.id, folder.name)
                  onToggleFolderExpanded(folder.id)
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
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )
    })
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Folders</h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-3">
          <Button
            variant={activeFolder === null ? "secondary" : "ghost"}
            size="sm"
            className="w-full justify-start mb-2"
            onClick={() => onFolderSelect(null, "All Bookmarks")}
          >
            <Folder className="mr-2 h-4 w-4" />
            All Bookmarks
          </Button>
          {renderFolderTree(null)}
        </div>
      </ScrollArea>
      <div className="p-3 border-t">
        <Button size="sm" variant="outline" className="w-full" onClick={onAddFolder}>
          <Plus className="h-4 w-4 mr-2" />
          New Folder
        </Button>
      </div>
    </div>
  )
}

