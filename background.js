// background.js
console.log("Background service worker running");

// Initialize storage with default data on installation
chrome.runtime.onInstalled.addListener(() => {
  console.log("Bookmark Manager extension installed.");
  chrome.storage.sync.get(["bookmarks", "folders"], (result) => {
    if (!result.bookmarks) {
      chrome.storage.sync.set({ bookmarks: [] }); // Initialize empty bookmarks
    }
    if (!result.folders) {
      chrome.storage.sync.set({ folders: [] }); // Initialize empty folders
    }
  });
});

// Handle messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "getTabUrl") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = tabs[0]?.url || "No URL found";
      const favicon = tabs[0]?.favIconUrl || ""; // Fetch the favicon URL
      const title = tabs[0]?.title || "No title found"; // Fetch the tab title
      console.log("URL sent to popup:", url); // Log in background
      console.log("Favicon sent to popup:", favicon); // Log in background
      console.log("Title sent to popup:", title); // Log in background
      sendResponse({ url, favicon, title }); // Send URL, favicon, and title
    });
    return true; // Keep the message channel open for async response
  }
});