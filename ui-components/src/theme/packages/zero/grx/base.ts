import { ThemeOptions } from "@mui/material";
import '@fontsource-variable/bodoni-moda-sc';
// Supports weights 100-900
import '@fontsource-variable/raleway';
// TODO: Test that italics work when tagged.
import '@fontsource-variable/raleway/wght-italic.css';

export const base: ThemeOptions = {
  typography: {
    h1: {
      fontFamily: 'Bodoni Moda SC Variable',
    },
    h2: {
      fontFamily: 'Bodoni Moda SC Variable',
    },
    h3: {
      fontFamily: 'Bodoni Moda SC Variable',
    },
    h4: {
      fontFamily: 'Bodoni Moda SC Variable',
    },
    h5: {
      fontFamily: 'Bodoni Moda SC Variable',
    },
    h6: {
      fontFamily: 'Bodoni Moda SC Variable',
    },
    body1: {
      fontFamily: 'Raleway Variable'
    },
    body2: {
      fontFamily: 'Raleway Variable'
    },
  },
};
