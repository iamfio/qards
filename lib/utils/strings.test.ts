import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

import { capitalize, getFQDN, getURL, isURL } from "./strings";

describe("lib/utils/strings", () => {
  describe("getFQDN", () => {
    it("returns first hostname segment without www", () => {
      expect(getFQDN("https://www.example.com/path")).toBe("example");
    });

    it("returns first segment for subdomains", () => {
      expect(getFQDN("https://docs.github.com/en")).toBe("docs");
    });

    it("returns empty string for invalid URL", () => {
      expect(getFQDN("not-a-url")).toBe("");
    });
  });

  describe("getURL", () => {
    const originalEnv = process.env.NEXT_PUBLIC_SITE_URL;

    beforeEach(() => {
      process.env.NEXT_PUBLIC_SITE_URL = "https://qards.app";
    });

    afterEach(() => {
      process.env.NEXT_PUBLIC_SITE_URL = originalEnv;
      vi.unstubAllGlobals();
    });

    it("resolves relative path against window origin in browser environment", () => {
      expect(getURL("/dashboard")).toBe("http://localhost:3000/dashboard");
    });

    it("resolves path against NEXT_PUBLIC_SITE_URL on server", () => {
      vi.stubGlobal("window", undefined);
      expect(getURL("/dashboard")).toBe("https://qards.app/dashboard");
    });

    it("returns original path when URL construction fails", () => {
      vi.stubGlobal("window", undefined);
      expect(getURL("http://[::1")).toBe("http://[::1");
    });
  });

  describe("isURL", () => {
    it("returns true for valid https URL", () => {
      expect(isURL("https://example.com/profile")).toBe(true);
    });

    it("returns true for localhost URL", () => {
      expect(isURL("http://localhost:3000/test")).toBe(true);
    });

    it("returns false for plain text", () => {
      expect(isURL("hello world")).toBe(false);
    });
  });

  describe("capitalize", () => {
    it("capitalizes first character", () => {
      expect(capitalize("qards")).toBe("Qards");
    });

    it("returns empty string for empty input", () => {
      expect(capitalize("")).toBe("");
    });
  });
});
