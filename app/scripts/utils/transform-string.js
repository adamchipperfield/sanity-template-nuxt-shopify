export const handleize = (string) => {
  return string
    .replace(/\s/g, '-')
    .replace(/\//g, '')
    .replace(/--/g, '-')
    .replace(/_/g, '-')
    .toLowerCase()
}

/**
 * Upper-cases the first character.
 * @param {string} s - The string to convert.
 * @returns {string}
 */
export const capitalize = (string) => {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`
}
