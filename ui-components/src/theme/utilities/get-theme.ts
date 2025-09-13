import { createTheme, Theme } from "@mui/material";
import { zeroGDS, zeroGRX } from "../packages/zero";
import { DESIGN_SYSTEM_MODES, DESIGN_SYSTEM_PROJECTS, DESIGN_SYSTEM_VERSIONS } from "../constants";
import { DesignSystemThemes, ModeThemeName, ModeThemes, ProjectThemeName, ProjectThemes, VersionThemeName } from "../types";

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
          ) => ({
            ...modeThemes,
            [modeName]: createTheme(),
          }),
          {} as ModeThemes
        )
      }),
      {} as ProjectThemes
    )
  }),
  {} as DesignSystemThemes
);

designSystem.zero.gds.light = zeroGDS;
designSystem.zero.grx.light = zeroGRX;

export const getTheme = (
  version: VersionThemeName,
  project: ProjectThemeName,
  mode: ModeThemeName,
): Theme => designSystem[version][project][mode];
