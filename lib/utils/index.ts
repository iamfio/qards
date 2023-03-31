//* String Utils

export const getFQDN = (url: string) => {
  return new URL(url).hostname.split('.')[0]
}

export const getURL = (path: string) => {
  const BASE_URL =
    typeof window === 'undefined'
      ? process.env.NEXT_PUBLIC_SITE_URL!
      : window.location.origin

  return new URL(path, BASE_URL).toString()
}

export const capitalize = (txt: string) =>
  txt.charAt(0).toUpperCase() + txt.slice(1)
