import { createContext } from "react";

export const ThemeContext = createContext({
  toggleColorMode: () => {},
  mode: new Function(),
});
