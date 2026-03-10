import { createTheme } from "@mui/material";
import { AppTheme, AppThemeStateOverride, SetThemeProps } from "../types";
import { getTheme } from "./get-theme";
import { create } from "zustand";

export const appThemeStore = create<AppTheme>((set, get) => {
  const getProps = (props: SetThemeProps) => {
    const { mode, project, version } = get();
    return {
      mode: props.mode || mode || 'light',
      project: props.project || project,
      version: props.version || version,
    };
  };
  const getPropsTheme = (props: SetThemeProps) => {
    const { mode, project, version } = getProps(props);
    return getTheme(version, project, mode);
  }
  const setTheme = (props: SetThemeProps) => {
    const base = getPropsTheme(props);
    const themeOverrides = get().themeOverrides ?? {};
    const theme = createTheme(base, themeOverrides);
    set({ ...props, theme });
  }
  const version = 'zero';
  const project = 'grx';
  const mode = 'light';
  const theme = getTheme(version, project, mode);
  const initialise = ({ themeOverrides, ...props }: AppThemeStateOverride) => set((state) => {
    const base = getPropsTheme(props);
    const theme = createTheme(base, themeOverrides ?? {});
    return {
      ...state,
      ...props,
      theme,
      themeOverrides,
    };
  });
  return {
    version,
    project,
    mode,
    theme,
    initialise,
    setTheme,
    get: () => {
      const { mode, project, version} = get();
      return getTheme(version, project, mode);
    },
  }
});
