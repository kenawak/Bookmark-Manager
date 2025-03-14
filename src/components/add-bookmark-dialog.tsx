"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Bookmark, Folder } from "@/types/bookmark"
import { ChromePicker } from "react-color"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AddBookmarkDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (bookmark: Bookmark) => void
  folders: Folder[]
  currentFolderId: string | null
}

function AddBookmarkDialog({
  open,
  onOpenChange,
  onAdd,
  folders,
  currentFolderId,
}: AddBookmarkDialogProps) {
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [description, setDescription] = useState("")
  const [folderId, setFolderId] = useState("")
  const [favicon, setFavicon] = useState("")
  const [color, setColor] = useState("#4285F4")
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [errors, setErrors] = useState<{
    title?: string
    url?: string
    folder?: string
  }>({})

  // Set current folder as default when dialog opens
  useEffect(() => {
    if (open && currentFolderId) {
      setFolderId(currentFolderId)
    }
  }, [open, currentFolderId])

  // Try to fetch favicon when URL changes
  useEffect(() => {
    if (url) {
      try {
        const urlObj = new URL(url.startsWith("http") ? url : `https://${url}`)
        setFavicon(`${urlObj.origin}/favicon.ico`)
      } catch (e) {
        // Invalid URL, don't set favicon
      }
    }
  }, [url])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate
    const newErrors: {
      title?: string
      url?: string
      folder?: string
    } = {}

    if (!title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!url.trim()) {
      newErrors.url = "URL is required"
    } else {
      try {
        // Ensure URL has protocol
        const urlObj = new URL(url.startsWith("http") ? url : `https://${url}`)
      } catch (e) {
        newErrors.url = "Please enter a valid URL"
      }
    }

    if (!folderId) {
      newErrors.folder = "Please select a folder"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Format URL to ensure it has a protocol
    const formattedUrl = url.startsWith("http") ? url : `https://${url}`

    // Create new bookmark
    const newBookmark: Bookmark = {
      id: "", // Will be set by the parent component
      title,
      url: formattedUrl,
      description,
      folderId,
      favicon,
      color,
      createdAt: "", // Will be set by the parent component
    }

    onAdd(newBookmark)
    resetForm()
  }

  const resetForm = () => {
    setTitle("")
    setUrl("")
    setDescription("")
    setFolderId("")
    setFavicon("")
    setColor("#4285F4")
    setShowColorPicker(false)
    setErrors({})
  }

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      resetForm()
    }
    onOpenChange(open)
  }

  // Get initials for avatar fallback
  const getInitials = (title: string) => {
    return title ? title.substring(0, 1).toUpperCase() : "B"
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-[400px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Bookmark</DialogTitle>
            <DialogDescription>Add a new bookmark to your collection.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={favicon} alt={title} />
                <AvatarFallback style={{ backgroundColor: color }} className="text-white">
                  {getInitials(title)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <Button type="button" variant="outline" size="sm" onClick={() => setShowColorPicker(!showColorPicker)}>
                  Change Color
                </Button>

                {showColorPicker && (
                  <div className="absolute z-10 mt-2">
                    <ChromePicker color={color} onChange={(color) => setColor(color.hex)} disableAlpha />
                    <div className="fixed inset-0 z-[-1]" onClick={() => setShowColorPicker(false)} />
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="title" className="font-medium">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter bookmark title"
                className={errors.title ? "border-destructive" : ""}
              />
              {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="url" className="font-medium">
                URL
              </Label>
              <Input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className={errors.url ? "border-destructive" : ""}
              />
              {errors.url && <p className="text-sm text-destructive">{errors.url}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description" className="font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a description (optional)"
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="folder" className="font-medium">
                Folder
              </Label>
              <Select value={folderId} onValueChange={setFolderId}>
                <SelectTrigger id="folder" className={errors.folder ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select a folder" />
                </SelectTrigger>
                <SelectContent>
                  {folders.map((folder) => (
                    <SelectItem key={folder.id} value={folder.id}>
                      {folder.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.folder && <p className="text-sm text-destructive">{errors.folder}</p>}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Bookmark</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddBookmarkDialog