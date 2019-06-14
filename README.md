# @swithchdin-superset-plugins 🔌💡

This is where SwitchDin puts it's superset plugins.

It's shamelessly copied from @switchdin-superset-plugins .... we understand it's not ready yet ... we're preparing.

### Development

[lerna](https://github.com/lerna/lerna/) and [yarn](https://yarnpkg.com) are used to manage versions and dependencies between
packages in this monorepo.

```
switchdin-superset-plugins/
  lerna.json
  package.json
  ...
  packages/
    package1/
      package.json
      ...
      src/
      test/
      ...
      lib/
      esm/
      ...
    ...
```

### Installation

1. clone this repo
2. have yarn install package dependencies and manage the symlinking between packages for you

```sh
git clone ...switchdin-superset-plugins-plugins && cd switchdin-superset-plugins-plugins
yarn install
yarn build
```

### Builds, linting, and testing

Each package defines its own build config, linting, and testing. You can have lerna run commands
across all packages using the syntax `yarn run test` (or `yarn run test:watch` for watch mode) from the root `@switchdin-superset-plugins` directory.

#### Storybook

You can demo your changes by running the storybook demo locally with the following commands:

```sh
yarn install
yarn build
cd packages/switchdin-superset-plugins-plugins-demo
yarn storybook
```

### Committing

This repository follows [conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.3/) guideline for commit messages and has a `commitlint` hook which will require you to have the valid commit message before committing. You can use `npm run commit` to help you create a commit message.

### Publishing

**Prerequisite:** You'll need an [npmjs.com](https://npmjs.com) account that is part of the `@switchdin-superset-plugins` organization.

1. Make sure you're logged in to NPM from your shell. Run `npm login` if necessary.
2. To make the release, run `yarn run release` and follow the prompts.

### License

Apache-2.0
