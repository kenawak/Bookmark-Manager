import React from 'react';
import type { Bookmark } from "@/types/bookmark";

interface BookmarkItemProps {
  bookmark: Bookmark;
  onDelete: (id: string) => void;
}

const BookmarkItem: React.FC<BookmarkItemProps> = ({ bookmark, onDelete }) => {
  return (
    <div>
      {/* Render bookmark details */}
      <h3>{bookmark.title}</h3>
      <button onClick={() => onDelete(bookmark.id)}>Delete</button>
    </div>
  );
};

export default BookmarkItem;
