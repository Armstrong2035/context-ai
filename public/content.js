const IMPORTANT_SELECTORS = [
  "article",
  "main",
  '[role="main"]',
  ".main-content",
  "#main-content",
];

// Cleans text by removing extra whitespace and line breaks
function cleanText(text) {
  return text
    .replace(/\s+/g, " ")
    .replace(/[\r\n]+/g, " ")
    .trim();
}

// Gets the main content of the page by trying different selectors
function getMainContent() {
  for (selector of IMPORTANT_SELECTORS) {
    const element = document.querySelector(selector);

    if (element) {
      return clearModuleContext(element.innerText);
    }
  }
  return cleanText(document.body.innerText);
}

// Extracts meta description from various possible meta tags
function getMetaDescription() {
  //   const metaDesc =
  //     document.querySelector('meta[name="description"]') ||
  //     document.querySelector('meta[property="og:description"]');
  //   return metaDesc ? metaDesc.getAttribute("content") : "";
  const metaDescription =
    document.querySelector('meta[name="description"') ||
    document.querySelector('meta[name="og:description"]');
  return metaDescription ? metaDescription.getAttribute("content") : "";
}

// Extracts keywords from meta tags
function getMetaKeywords() {
  //   const metaKeywords = document.querySelector('meta[name="keywords"]');
  //   return metaKeywords
  //     ? metaKeywords
  //         .getAttribute("content")
  //         .split(",")
  //         .map((k) => k.trim())
  //     : [];

  const metaKeywords = document.querySelector('meta[name="keywords"]');
  return metaKeywords
    ? metaKeywords
        .getAttribute("content")
        .split(",")
        .map((k) => k.trim())
    : [];
}

// Collects all headings (h1, h2, h3) from the page
function getHeadings() {
  //   const headings = [];
  //   ["h1", "h2", "h3"].forEach((tag) => {
  //     document.querySelectorAll(tag).forEach((element) => {
  //       headings.push({
  //         level: tag,
  //         text: cleanText(element.innerText),
  //       });
  //     });
  //   });
  //   return headings;

  const headings = [];
  ["h1", "h2", "h3"].forEach((tag) => {
    document.querySelectorAll(tag).forEach((element) => {
      headings.push({
        level: tag,
        text: cleanText(element.innerText),
      });
    });
  });
  return headings;
}

// Gets all metadata about the page
function getMetadata() {
  return {
    title: document.title,
    url: window.location.href,
    description: getMetaDescription(),
    keywords: getMetaKeywords(),
    headings: getHeadings(),
    timestamp: new Date().toISOString(),
  };
}

// Estimates reading time based on word count
function estimateReadingTime(text) {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Main function to extract all content and metadata
function extractContent() {
  const mainContent = getMainContent();
  return {
    metadata: getMetadata(),
    content: mainContent,
    readingTime: estimateReadingTime(mainContent),
  };
}

// Listen for messages from the extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "extractContent") {
    sendResponse(extractContent());
    return true;
  }
});

// Create and start the observer
const observer = new MutationObserver(handleDOMChanges);

// Start observing the document
observer.observe(document.body, {
  childList: true, // Watch for changes in direct children
  subtree: true, // Watch for changes in all descendants
  characterData: true, // Watch for changes in text content
});
