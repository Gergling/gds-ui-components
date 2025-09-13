import { useContext } from "react";
import { AppThemeStoreContext } from "./app-theme.context";

export const useAppTheme = () => {
  const context = useContext(AppThemeStoreContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
