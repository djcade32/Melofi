// Function to check if an element is in the viewport
function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
// Function to lazily load content
export function lazyLoadContent() {
  const lazyContentElements = document.querySelectorAll(".lazy-content");
  lazyContentElements.forEach((element) => {
    if (isElementInViewport(element)) {
      // Add your logic to load the content for the element here
      element.classList.add("loaded");
    }
  });
}
