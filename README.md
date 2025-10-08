# Project GDS: Gergling Design System
[![Unit Tests](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/gergling/gds-ui-components/main/status/unit-tests.json)](https://github.com/gergling/gds-ui-components/actions/workflows/deploy.yml)
[![npm version](https://img.shields.io/npm/v/ui-components.svg)](https://www.npmjs.com/package/ui-components)

This project is intended to build a complete design system for all of my personal projects, thus unifying my vanity projects more literally.

## Workspaces

* `ui-components`: The design system package.
  * Has some basic components.
  * Includes a theme wrapper and provider to use in consuming applications.
  * Theme types are extended for Emotion and MUI, which are peer dependencies.
* `every-app`: The demo application to test the packaging.

## Development Process 

1. Storybook:
    1. Implement components and theme in `src`.
    2. `npm run storybook` or `nx storybook ui-components` to view.
2. Every App: When basic components are done.
    1. `npm run build` will make a `ui-components` build.
    2. `npm i` will install the latest locally-built `ui-components` package.
    3. Implement components in `src` for testing purposes.

## Theme Type Extension

The main part of the extension is a `colors` property, which is designed to more closely mimic MD3 colour system standards than MUI.
