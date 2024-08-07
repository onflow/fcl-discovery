export function convertToPixels(
  size: string,
  context = document.documentElement,
) {
  // Create a temporary element
  const tempEl = document.createElement('div')

  // Set the element's style
  tempEl.style.width = size
  tempEl.style.position = 'absolute'
  tempEl.style.visibility = 'hidden'

  // Append the element to the context (usually the document or a specific element)
  context.appendChild(tempEl)

  // Get the computed width in pixels
  const pixels = window.getComputedStyle(tempEl).width

  // Remove the temporary element
  context.removeChild(tempEl)

  // Return the width as a number (parseFloat removes the 'px' unit)
  return parseFloat(pixels)
}
