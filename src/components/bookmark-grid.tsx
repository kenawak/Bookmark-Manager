import BookmarkCard from "@/components/bookmark-card"
import type { Bookmark } from "@/types/bookmark"

interface BookmarkGridProps {
  bookmarks: Bookmark[]
  onToggleFavorite: (id: string) => void
  onDelete: (id: string) => void
}

function BookmarkGrid({ bookmarks, onToggleFavorite, onDelete }: BookmarkGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {bookmarks.map((bookmark) => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} onToggleFavorite={onToggleFavorite} onDelete={onDelete} />
      ))}

      {bookmarks.length === 0 && (
        <div className="col-span-full flex flex-col items-center justify-center h-64 text-center">
          <p className="text-muted-foreground mb-4">No bookmarks found</p>
        </div>
      )}
    </div>
  )
}
export default BookmarkGrid
