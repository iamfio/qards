import { describe, expect, it } from "vitest";

import { getUserInitials } from "./avatar";

describe("lib/utils/avatar", () => {
  describe("getUserInitials", () => {
    it("returns first two letters for single-word name", () => {
      expect(getUserInitials("john")).toBe("JO");
    });

    it("returns initials for multi-word name", () => {
      expect(getUserInitials("John Doe")).toBe("JD");
    });

    it("ignores extra spaces in name", () => {
      expect(getUserInitials("  John   Doe  ")).toBe("JD");
    });

    it("falls back to email when name is empty", () => {
      expect(getUserInitials("   ", "mail@example.com")).toBe("MA");
    });

    it("returns U when both name and email are missing", () => {
      expect(getUserInitials(undefined, undefined)).toBe("U");
    });

    it("returns U when both name and email are blank", () => {
      expect(getUserInitials("   ", "   ")).toBe("U");
    });
  });
});
