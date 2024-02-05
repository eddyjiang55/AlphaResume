export function splitMarkdownIntoPages(markdownContent, linesPerPage = 35) {
  // Split the content into lines
  const lines = markdownContent.split('\n');

  // Array to hold pages
  let pages = [];
  
  // Temporary variable to store current page content
  let currentPageContent = [];

  // Iterate over each line
  for (let line of lines) {
    // Add line to current page content
    currentPageContent.push(line);

    // Check if the current page is full
    if (currentPageContent.length >= linesPerPage) {
      // Join the lines to form a page, then add to pages array
      pages.push(currentPageContent.join('\n'));
      
      // Reset current page content
      currentPageContent = [];
    }
  }

  // Add any remaining content as the last page
  if (currentPageContent.length > 0) {
    pages.push(currentPageContent.join('\n'));
  }

  return pages;
}
