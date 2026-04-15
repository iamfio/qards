"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps, useTheme as useNextTheme } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

type AppTheme = "light" | "dark" | "system" | "corporate" | "black";

function mapToAppTheme(theme?: string) {
  if (theme === "dark") {
    return "black";
  }

  if (theme === "light") {
    return "corporate";
  }

  return theme as AppTheme | undefined;
}

export function useTheme() {
  const themeApi = useNextTheme();

  const mappedTheme = React.useMemo(() => {
    const theme =
      themeApi.theme === "system"
        ? (themeApi.resolvedTheme ?? "system")
        : themeApi.theme;

    return mapToAppTheme(theme);
  }, [themeApi.theme, themeApi.resolvedTheme]);

  const mappedResolvedTheme = React.useMemo(
    () => mapToAppTheme(themeApi.resolvedTheme),
    [themeApi.resolvedTheme],
  );

  const setTheme = React.useCallback(
    (theme: AppTheme) => {
      if (theme === "black") {
        themeApi.setTheme("dark");
        return;
      }

      if (theme === "corporate") {
        themeApi.setTheme("light");
        return;
      }

      themeApi.setTheme(theme);
    },
    [themeApi],
  );

  return {
    ...themeApi,
    theme: mappedTheme,
    resolvedTheme: mappedResolvedTheme,
    setTheme,
  };
}
