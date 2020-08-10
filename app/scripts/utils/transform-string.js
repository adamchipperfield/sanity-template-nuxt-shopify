export const handleize = (string) => {
  return string
    .replace(/\s/g, '-')
    .replace(/\//g, '')
    .replace(/--/g, '-')
    .replace(/_/g, '-')
    .toLowerCase()
}
