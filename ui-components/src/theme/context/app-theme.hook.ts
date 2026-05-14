import { useContext } from "react";
import { AppThemeStoreContext } from "./app-theme.context";
import { AppTheme } from "../types";

export const useTheme = (): AppTheme => {
  const context = useContext(AppThemeStoreContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
/**
 * @deprecated Use `useTheme` instead.
 * ...
 */
export const useAppTheme = useTheme;
