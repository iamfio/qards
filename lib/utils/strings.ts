//* String Utils

import { parse } from "tldts";

export function getFQDN(url: string): string {
  try {
    return parse(url).domainWithoutSuffix ?? "";
  } catch {
    return "";
  }
}

// cache base URL once
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

// normalize path + build absolute URL
export function getURL(path = ""): string {
  const base =
    typeof globalThis.window !== "undefined"
      ? window.location.origin
      : (SITE_URL ?? "http://localhost:3000");

  return new URL(path, base).toString();
}

export function isURL(value: string): boolean {
  if (!value.includes(".")) {
    return false;
  }

  try {
    const url = new URL(value);
    return url.hostname.length > 0;
  } catch {
    return false;
  }
}

export function capitalize(value: string): string {
  if (!value) {
    return "";
  }

  const chars = Array.from(value);
  chars[0] = chars[0].toLocaleUpperCase();

  return chars.join("");
}
