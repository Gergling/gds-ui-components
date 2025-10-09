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
3. Versioning:
    * **Important:** Ideally, the maximum quality should be assured before a version bump, but at the moment the process supports pushing unstable changes to the `main` branch. *Avoid bumping the version without assuring quality*.
    1. `npm run version patch|minor|major` will update all `package.json` versions.
    2. Pushing to the `main` branch will trigger tagging against the branch for the version in the root `package.json` file.
    3. If a new tag is created, publishing to `npm` is triggered.

### Notes

* At the moment, the development process is intended for one human developer, and as such the QA pipeline (`.github/workflows/deploy.yml`) is triggered by the same `main` branch push, along with the tagging and publishing once quality assurance automation is completed.
* PRs *can* be raised, but until there are additional human developers, the `main` branch will remain unprotected against non-PR pushes.

## Theme Type Extension

The main part of the extension is a `colors` property, which is designed to more closely mimic MD3 colour system standards than MUI.
