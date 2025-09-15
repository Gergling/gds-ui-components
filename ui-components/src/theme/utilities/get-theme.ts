import { createTheme, Theme } from "@mui/material";
import {
  zeroGDS,
  zeroGRXDark,
  zeroGRXLight
} from "../packages/zero";
import {
  DESIGN_SYSTEM_MODES,
  DESIGN_SYSTEM_PROJECTS,
  DESIGN_SYSTEM_VERSIONS
} from "../constants";
import {
  DesignSystemThemes,
  ModeThemeName,
  ModeThemes,
  ProjectThemeName,
  ProjectThemes,
  VersionThemeName
} from "../types";

const designSystem = DESIGN_SYSTEM_VERSIONS.reduce(
  (
    designSystem,
    versionName,
  ) => ({
    ...designSystem,
    [versionName]: DESIGN_SYSTEM_PROJECTS.reduce(
      (
        projectThemes,
        projectName,
      ) => ({
        ...projectThemes,
        [projectName]: DESIGN_SYSTEM_MODES.reduce(
          (
            modeThemes,
            modeName,
          ) => {
            const theme = designSystem[versionName]
              && designSystem[versionName][projectName]
              && designSystem[versionName][projectName][modeName];
            return {
              ...modeThemes,
              [modeName]: theme || createTheme({
                palette: {
                  mode: modeName
                },
              }),
            };
          },
          {} as ModeThemes
        )
      }),
      {} as ProjectThemes
    )
  }),
  {
    zero: {
      gds: {
        light: zeroGDS,
      },
      grx: {
        dark: zeroGRXDark,
        light: zeroGRXLight,
      }
    }
  } as DesignSystemThemes
);

export const getTheme = (
  version: VersionThemeName,
  project: ProjectThemeName,
  mode: ModeThemeName,
): Theme => designSystem[version][project][mode];
