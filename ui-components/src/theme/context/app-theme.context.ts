import { createContext } from "react";
import { AppTheme } from "../types";

export const AppThemeStoreContext = createContext<AppTheme | undefined>(undefined);
