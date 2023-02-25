//* String Utils

export const getFQDN = (url: string) => {
  return new URL(url).hostname.split('.')[0]
}
