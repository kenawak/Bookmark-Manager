"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Folder } from "@/types/bookmark"

interface AddFolderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (name: string, parentId: string | null) => void
  folders: Folder[]
  currentFolderId: string | null
}

function AddFolderDialog({ open, onOpenChange, onAdd, folders, currentFolderId }: AddFolderDialogProps) {
  const [name, setName] = useState("")
  const [parentId, setParentId] = useState<string | null>(null)
  const [errors, setErrors] = useState<{
    name?: string
  }>({})

  // Set current folder as default parent when dialog opens
  useEffect(() => {
    if (open && currentFolderId) {
      setParentId(currentFolderId)
    }
  }, [open, currentFolderId])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate
    const newErrors: {
      name?: string
    } = {}

    if (!name.trim()) {
      newErrors.name = "Folder name is required"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onAdd(name, parentId)
    resetForm()
  }

  const resetForm = () => {
    setName("")
    setParentId(null)
    setErrors({})
  }

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      resetForm()
    }
    onOpenChange(open)
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-[400px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>New Folder</DialogTitle>
            <DialogDescription>Create a new folder to organize your bookmarks.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="font-medium">
                Folder Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter folder name"
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="parent" className="font-medium">
                Parent Folder (Optional)
              </Label>
              <Select value={parentId || ""} onValueChange={(value) => setParentId(value || null)}>
                <SelectTrigger id="parent">
                  <SelectValue placeholder="Root (No parent)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="root">Root (No parent)</SelectItem>
                  {folders.map((folder) => (
                    <SelectItem key={folder.id} value={folder.id}>
                      {folder.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Folder</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddFolderDialog

