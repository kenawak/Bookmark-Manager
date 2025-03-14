import type { Bookmark, Folder } from "@/types/bookmark"

// Generate a random date within the last 30 days
const getRandomDate = () => {
  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  const randomTime = thirtyDaysAgo.getTime() + Math.random() * (now.getTime() - thirtyDaysAgo.getTime())
  return new Date(randomTime).toISOString()
}

// Mock folders data
export const mockFolders: Folder[] = [
  { id: "1", name: "Work", parentId: null, count: 0 },
  { id: "2", name: "Personal", parentId: null, count: 0 },
  { id: "3", name: "Shopping", parentId: null, count: 0 },
  { id: "4", name: "Development", parentId: "1", count: 0 },
  { id: "5", name: "Design", parentId: "1", count: 0 },
  { id: "6", name: "Finance", parentId: "2", count: 0 },
  { id: "7", name: "Travel", parentId: "2", count: 0 },
  { id: "8", name: "Education", parentId: null, count: 0 },
  { id: "9", name: "Frontend", parentId: "4", count: 0 },
  { id: "10", name: "Backend", parentId: "4", count: 0 },
  { id: "11", name: "DevOps", parentId: "4", count: 0 },
  { id: "12", name: "UI/UX", parentId: "5", count: 0 },
  { id: "13", name: "Graphics", parentId: "5", count: 0 },
]

// Mock bookmarks data
export const mockBookmarks: Bookmark[] = [
  {
    id: "1",
    title: "Google",
    url: "https://google.com",
    folderId: "1",
    favicon: "https://www.google.com/favicon.ico",
    color: "#4285F4",
    createdAt: getRandomDate(),
    isFavorite: true,
    description: "The world's most popular search engine.",
  },
  {
    id: "2",
    title: "GitHub",
    url: "https://github.com",
    folderId: "4",
    favicon: "https://github.com/favicon.ico",
    color: "#24292e",
    createdAt: getRandomDate(),
    isFavorite: true,
    description: "Where the world builds software. Home to over 100 million repositories.",
  },
  {
    id: "3",
    title: "Figma",
    url: "https://figma.com",
    folderId: "5",
    favicon: "https://static.figma.com/app/icon/1/favicon.png",
    color: "#a259ff",
    createdAt: getRandomDate(),
    isFavorite: false,
    description: "Collaborative interface design tool for teams.",
  },
  {
    id: "4",
    title: "Amazon",
    url: "https://amazon.com",
    folderId: "3",
    favicon: "https://www.amazon.com/favicon.ico",
    color: "#ff9900",
    createdAt: getRandomDate(),
    isFavorite: false,
    description: "Online shopping platform with a vast selection of products.",
  },
  {
    id: "5",
    title: "Netflix",
    url: "https://netflix.com",
    folderId: "2",
    favicon: "https://www.netflix.com/favicon.ico",
    color: "#e50914",
    createdAt: getRandomDate(),
    isFavorite: true,
    description: "Streaming service offering movies, TV shows, and original content.",
  },
  {
    id: "6",
    title: "Bank of America",
    url: "https://bankofamerica.com",
    folderId: "6",
    favicon: "https://www.bankofamerica.com/favicon.ico",
    color: "#012169",
    createdAt: getRandomDate(),
    isFavorite: false,
    description: "Financial services and banking institution.",
  },
  {
    id: "7",
    title: "Airbnb",
    url: "https://airbnb.com",
    folderId: "7",
    favicon: "https://www.airbnb.com/favicon.ico",
    color: "#ff5a5f",
    createdAt: getRandomDate(),
    isFavorite: false,
    description: "Online marketplace for lodging, primarily homestays for vacation rentals.",
  },
  {
    id: "8",
    title: "Stack Overflow",
    url: "https://stackoverflow.com",
    folderId: "9",
    favicon: "https://stackoverflow.com/favicon.ico",
    color: "#f48024",
    createdAt: getRandomDate(),
    isFavorite: true,
    description: "Community for developers to learn and share programming knowledge.",
  },
  {
    id: "9",
    title: "Next.js Documentation",
    url: "https://nextjs.org/docs",
    folderId: "9",
    favicon: "https://nextjs.org/favicon.ico",
    color: "#000000",
    createdAt: getRandomDate(),
    isFavorite: true,
    description: "Official documentation for the Next.js React framework.",
  },
  {
    id: "10",
    title: "Tailwind CSS",
    url: "https://tailwindcss.com",
    folderId: "9",
    favicon: "https://tailwindcss.com/favicon.ico",
    color: "#38bdf8",
    createdAt: getRandomDate(),
    isFavorite: true,
    description: "A utility-first CSS framework for rapidly building custom designs.",
  },
  {
    id: "11",
    title: "Node.js Documentation",
    url: "https://nodejs.org/en/docs",
    folderId: "10",
    favicon: "https://nodejs.org/favicon.ico",
    color: "#43853d",
    createdAt: getRandomDate(),
    isFavorite: false,
    description: "Documentation for Node.js, a JavaScript runtime built on Chrome's V8 engine.",
  },
  {
    id: "12",
    title: "Docker Documentation",
    url: "https://docs.docker.com",
    folderId: "11",
    favicon: "https://www.docker.com/favicon.ico",
    color: "#2496ed",
    createdAt: getRandomDate(),
    isFavorite: false,
    description: "Documentation for Docker, a platform for developing, shipping, and running applications.",
  },
  {
    id: "13",
    title: "MDN Web Docs",
    url: "https://developer.mozilla.org",
    folderId: "9",
    favicon: "https://developer.mozilla.org/favicon.ico",
    color: "#000000",
    createdAt: getRandomDate(),
    isFavorite: true,
    description: "Resources for developers, by developers. Documentation for web standards.",
  },
  {
    id: "14",
    title: "Coursera",
    url: "https://coursera.org",
    folderId: "8",
    favicon: "https://www.coursera.org/favicon.ico",
    color: "#0056D2",
    createdAt: getRandomDate(),
    isFavorite: false,
    description: "Online learning platform offering courses from top universities and companies.",
  },
  {
    id: "15",
    title: "edX",
    url: "https://edx.org",
    folderId: "8",
    favicon: "https://www.edx.org/favicon.ico",
    color: "#02262B",
    createdAt: getRandomDate(),
    isFavorite: false,
    description: "Online learning platform founded by Harvard and MIT offering courses from universities worldwide.",
  },
  {
    id: "16",
    title: "Dribbble",
    url: "https://dribbble.com",
    folderId: "12",
    favicon: "https://dribbble.com/favicon.ico",
    color: "#ea4c89",
    createdAt: getRandomDate(),
    isFavorite: false,
    description: "Community for designers to showcase, promote, and discover design work.",
  },
  {
    id: "17",
    title: "Behance",
    url: "https://behance.net",
    folderId: "12",
    favicon: "https://www.behance.net/favicon.ico",
    color: "#0057ff",
    createdAt: getRandomDate(),
    isFavorite: false,
    description: "Platform for creative professionals to showcase and discover creative work.",
  },
  {
    id: "18",
    title: "Adobe",
    url: "https://adobe.com",
    folderId: "13",
    favicon: "https://www.adobe.com/favicon.ico",
    color: "#ff0000",
    createdAt: getRandomDate(),
    isFavorite: false,
    description: "Software company known for creative tools like Photoshop, Illustrator, and more.",
  },
  {
    id: "19",
    title: "Canva",
    url: "https://canva.com",
    folderId: "13",
    favicon: "https://www.canva.com/favicon.ico",
    color: "#00c4cc",
    createdAt: getRandomDate(),
    isFavorite: false,
    description: "Online design and publishing tool with templates for various design needs.",
  },
  {
    id: "20",
    title: "YouTube",
    url: "https://youtube.com",
    folderId: "2",
    favicon: "https://www.youtube.com/favicon.ico",
    color: "#ff0000",
    createdAt: getRandomDate(),
    isFavorite: true,
    description: "Video sharing platform where users can upload, view, and share videos.",
  },
]

// Helper function to get bookmarks for a specific folder
export function getBookmarksByFolder(folderId: string | null) {
  if (folderId === null) {
    return mockBookmarks
  }
  return mockBookmarks.filter((bookmark) => bookmark.folderId === folderId)
}

// Helper function to get child folders
export function getChildFolders(parentId: string | null) {
  return mockFolders.filter((folder) => folder.parentId === parentId)
}

// Helper function to get favorite bookmarks
export function getFavoriteBookmarks() {
  return mockBookmarks.filter((bookmark) => bookmark.isFavorite)
}

// Helper function to search bookmarks
export function searchBookmarks(query: string) {
  if (!query) return mockBookmarks

  const lowerQuery = query.toLowerCase()
  return mockBookmarks.filter(
    (bookmark) =>
      bookmark.title.toLowerCase().includes(lowerQuery) ||
      bookmark.url.toLowerCase().includes(lowerQuery) ||
      (bookmark.description && bookmark.description.toLowerCase().includes(lowerQuery)),
  )
}

