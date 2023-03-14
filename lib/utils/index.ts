//* String Utils

export const getFQDN = (url: string) => {
  return new URL(url).hostname.split('.')[0]
}

export const capitalize = (txt: string) =>
txt.charAt(0).toUpperCase() + txt.slice(1)