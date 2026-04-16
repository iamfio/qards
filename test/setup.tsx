import { afterEach, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

vi.mock("next-themes", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
  useTheme: () => ({
    theme: "system",
    setTheme: vi.fn(),
    resolvedTheme: "light",
    themes: ["light", "dark", "system"],
  }),
}));

// Clean up after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// Mock ResizeObserver
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserverMock;

// Mock window.matchMedia
Object.defineProperty(globalThis, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Create a custom render function with providers
export function renderWithProviders(
  ui: React.ReactElement,
  { session = null, ...renderOptions } = {},
) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return <SessionProvider session={session}>{children}</SessionProvider>;
  };

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}
