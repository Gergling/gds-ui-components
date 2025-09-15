import { AppTheme, SetThemeProps } from "../types";
import { getTheme } from "./get-theme";
import { create } from "zustand";

export const appThemeStore = create<AppTheme>((set, get) => {
  const getProps = (props: SetThemeProps) => {
    console.log('getProps', props, get());
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
    const theme = getPropsTheme(props);
    set({ ...props, theme });
  }
  const version = 'zero';
  const project = 'grx';
  const mode = 'light';
  const theme = getTheme(version, project, mode);
  return {
    version,
    project,
    mode,
    theme,
    setTheme,
    get: () => {
      const { mode, project, version} = get();
      return getTheme(version, project, mode);
    },
  }
});
