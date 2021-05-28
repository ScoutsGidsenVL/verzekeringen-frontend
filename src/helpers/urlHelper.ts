export const sanitizeUrl = (url: string): string => {
  const firstChar: string = url.charAt(0)
  const lastChar: string = url.charAt(url.length - 1)

  if (firstChar !== '/') {
    url = '/' + url
  }

  if (lastChar === '/') {
    url = url.slice(0, -1)
  }

  return url
}
