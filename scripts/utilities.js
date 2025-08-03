/**
 * Utility
 * scroll the page down by `y` pixels vertically
 */
function scrollDown(by=100) {
  window.scrollBy({
    top: by,
    left: 0,
    behavior: 'smooth' // Smooth scrolling
  });
}
