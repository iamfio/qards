import { screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import QardList from "../QardList";
import { renderWithProviders } from "@/test/setup";

const mockQards = [
  {
    id: "1",
    accountName: "Qard 1",
    accountLink: "https://example.com/1",
    position: 0,
    userId: "user1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    accountName: "Qard 2",
    accountLink: "https://example.com/2",
    position: 1,
    userId: "user1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Mock fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ qards: mockQards }),
  }),
) as any;

vi.mock("@/components/ui/icons/IconGeneric", () => ({
  default: ({ name }: { name: string }) => (
    <div data-testid={`icon-${name}`}>{name}</div>
  ),
}));

describe("QardList Component", () => {
  it("fetches and displays a list of qards", async () => {
    renderWithProviders(<QardList />);

    // Wait for the qards to be loaded and displayed
    await waitFor(() => {
      expect(screen.getByText("Qard 1")).toBeDefined();
      expect(screen.getByText("Qard 2")).toBeDefined();
    });
  });

  it("opens the 'New Qard' dialog", async () => {
    renderWithProviders(<QardList />);

    const newQardButton = screen.getByRole("button", { name: "New Qard" });
    fireEvent.click(newQardButton);

    expect(
      await screen.findByRole("heading", { name: "New Qard" }),
    ).toBeDefined();
  });

  it("shows an empty list message when there are no qards", async () => {
    // Mock fetch to return an empty array
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ qards: [] }),
      }),
    ) as any;

    renderWithProviders(<QardList />);

    await waitFor(() => {
      // Use a more flexible matcher, e.g., a regex, or look for the exact string with the period
      expect(screen.getByText("You have no cards yet.")).toBeDefined();
    });
  });
});
