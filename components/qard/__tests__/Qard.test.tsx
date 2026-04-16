import { screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Qard from "../Qard";
import { renderWithProviders } from "@/test/setup";

// Mock the next-qrcode hook
vi.mock("next-qrcode", () => ({
  useQRCode: () => ({
    Canvas: ({ text }: { text: string }) => (
      <div data-testid="mock-qrcode">{text}</div>
    ),
  }),
}));

// Mock the ThemeProvider hook
vi.mock("@/components/theme/ThemeProvider", () => ({
  useTheme: () => ({
    theme: "black",
  }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children, // Mock Provider
}));

// Mock the IconGeneric component
vi.mock("@/components/ui/icons/IconGeneric", () => ({
  default: ({ name }: { name: string }) => (
    <div data-testid={`icon-${name}`}>{name}</div>
  ),
}));

describe("Qard Component", () => {
  it("renders correctly with given props", () => {
    const accountName = "testaccount";
    const accountLink = "https://example.com/testaccount";

    renderWithProviders(
      <Qard
        accountName={accountName}
        accountLink={accountLink}
      />,
    );

    // Check if account name is capitalized and rendered
    expect(screen.getByText("Testaccount")).toBeDefined();

    // Check if the link is correct
    const linkElement = screen.getByRole("link", { name: "Testaccount" });
    expect(linkElement.getAttribute("href")).toBe(accountLink);

    // Check if QRCode is rendered with the correct text
    const qrCode = screen.getByTestId("mock-qrcode");
    expect(qrCode.textContent).toBe(accountLink);

    // Check if the icon is rendered
    const icon = screen.getByTestId(`icon-${accountLink}`);
    expect(icon).toBeDefined();
  });
});
