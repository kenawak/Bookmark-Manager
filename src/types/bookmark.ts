export interface Bookmark {
    id: string
    title: string
    url: string
    folderId: string
    favicon: string
    color: string
    createdAt: string
    isFavorite?: boolean
    description?: string
  }
  
  export interface Folder {
    id: string
    name: string
    count: number
    parentId: string | null
  }
  
  