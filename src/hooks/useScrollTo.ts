/**
 * Smooth-scroll utility for anchor navigation across pages.
 * If on the same page, scrolls directly.
 * If on a different page, navigates to root with hash.
 */
export function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else if (typeof window !== 'undefined') {
    if (window.location.pathname !== '/') {
      window.location.href = `/#${id}`;
    }
  }
}
