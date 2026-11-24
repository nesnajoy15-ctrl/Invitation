// Shared handle to the single Lenis instance created in App.
export const lenisRef = { current: null }

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenisRef.current) lenisRef.current.scrollTo(el, { offset: 0, duration: 1.6 })
  else el.scrollIntoView({ behavior: 'smooth' })
}
