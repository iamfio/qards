"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useLocalStorage } from "usehooks-ts";

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
  setTheme: (themeName: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [storedTheme, setStoredTheme] = useLocalStorage("theme", "business");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", storedTheme);
  }, [storedTheme]);

  const toggleTheme = useCallback(() => {
    setStoredTheme((prevTheme) =>
      prevTheme === "business" ? "corporate" : "business",
    );
  }, [setStoredTheme]);

  const setTheme = useCallback(
    (themeName: string) => {
      setStoredTheme(themeName);
    },
    [setStoredTheme],
  );

  return (
    <ThemeContext.Provider
      value={{ theme: storedTheme, toggleTheme, setTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
