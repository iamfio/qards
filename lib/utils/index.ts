//* String Utils

export function getFQDN(url: string) {
  try {
    return new URL(url).hostname.replace('www.', '').split('.')[0]
  } catch (e) {
    return ''
  }
}

export function getURL(path: string) {
  try {
    const BASE_URL =
      typeof window === 'undefined'
        ? process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
        : window.location.origin

    return new URL(path, BASE_URL).toString()
  } catch (e) {
    return path
  }
}

export function isURL(url: string) {
  return /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/.test(url)
}

export function capitalize(txt: string) {
  if (!txt) {
    return ''
  }
  return txt.charAt(0).toUpperCase() + txt.slice(1)
}
