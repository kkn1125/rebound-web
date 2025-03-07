import {
  createTheme,
  CssVarsThemeOptions,
  responsiveFontSizes,
  ThemeOptions,
  ThemeProvider,
} from "@mui/material";
import darkTheme from "@theme/darkTheme";
import lightTheme from "@theme/lightTheme";
import { memo, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { ThemeContext } from "./context/ThemeContext";

const THEME_KEY = "theme";

interface GlobalThemeProviderProps {
  children: React.ReactNode;
}
const GlobalThemeProvider: React.FC<GlobalThemeProviderProps> = ({
  children,
}) => {
  const [mode, setMode] = useState<ThemeMode>("light");

  useLayoutEffect(() => {
    const getStoredTheme = () => {
      const storedTheme = localStorage.getItem(THEME_KEY) as
        | ThemeMode
        | undefined;
      return storedTheme;
    };
    const storeTheme = (matchDark: boolean) => {
      const changedTheme = matchDark ? "dark" : "light";
      localStorage.setItem(THEME_KEY, changedTheme);
      console.log(`✨ set default stored theme value: "${changedTheme}"`);
    };

    const storedTheme = getStoredTheme();
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const isDarkMode = mediaQuery.matches;
    // console.log(`✅ check storedTheme: ${storedTheme}`);
    // console.log(`✅ check is dark?: ${isDarkMode}`);

    if (!storedTheme) {
      storeTheme(isDarkMode);
      setMode(isDarkMode ? "dark" : "light");
    } else {
      // console.log(`✨ already set the value of mode: "${storedTheme}"`);
      if (!["light", "dark"].includes(storedTheme)) {
        setMode("light");
        storeTheme(false);
      } else {
        setMode(storedTheme);
      }
    }

    const handleChaneMediaQuery = (e: MediaQueryListEvent) => {
      const isDarkMode = e.matches;
      if (!getStoredTheme()) {
        storeTheme(isDarkMode);
      }
      // console.log(`✅ check storedTheme: ${storedTheme}`);
      // console.log(`✅ check is dark?: ${isDarkMode}`);
    };
    mediaQuery.addEventListener("change", handleChaneMediaQuery);
    return () => {
      mediaQuery.removeEventListener("change", handleChaneMediaQuery);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, mode);
  }, [mode]);

  const getTheme = (
    mode: ThemeMode
  ): Omit<ThemeOptions, "components"> &
    Pick<
      CssVarsThemeOptions,
      "defaultColorScheme" | "colorSchemes" | "components"
    > => {
    const newTheme = mode === "light" ? lightTheme : darkTheme;
    return {
      palette: {
        mode,
        contrastThreshold: 3.1,
        ...newTheme,
      },
      typography: {
        // fontFamily: "'Playfair Display', 'Noto Sans KR', sans-serif, serif",
        allVariants: {
          color: newTheme.text?.primary,
          // colorAdjust: "exact",
          wordBreak: "keep-all",
        },
        caption: {
          // color: newTheme.text?.disabled,
        },
      },
    };
  };

  const memoizeTheme = useMemo(() => {
    return responsiveFontSizes(createTheme(getTheme(mode)));
  }, [mode]);

  const colorMode = {
    toggleColorMode: () => {
      setMode((prev) => {
        const newMode = prev === "light" ? "dark" : "light";
        localStorage.setItem(THEME_KEY, newMode);
        return newMode;
      });
    },
    mode: () => mode,
  };

  return (
    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={memoizeTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default memo(GlobalThemeProvider);
