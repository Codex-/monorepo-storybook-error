const path = require("path");

const RELATIVE_PATH_TO_ROOT = "../../../";

module.exports = {
  framework: "@storybook/react",
  core: {
    builder: "storybook-builder-vite",
  },
  addons: ["@storybook/addon-essentials", "@storybook/addon-links"],
  stories: [
    path.resolve(
      path.join(__dirname, "../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)")
    ),
  ],
  viteFinal: async (config) => {
    // This should be able to be removed pending the release of https://github.com/storybookjs/storybook/pull/17000
    config.resolve.alias = {
      ...config.resolve.alias,
      "@emotion/core": path.resolve(
        path.join(
          __dirname,
          RELATIVE_PATH_TO_ROOT,
          "node_modules/@emotion/core"
        )
      ),
      "@emotion/react": path.resolve(
        path.join(
          __dirname,
          RELATIVE_PATH_TO_ROOT,
          "node_modules/@emotion/react"
        )
      ),
      "@emotion/styled": path.resolve(
        path.join(
          __dirname,
          RELATIVE_PATH_TO_ROOT,
          "node_modules/@emotion/styled"
        )
      ),
      "emotion-theming": path.resolve(
        path.join(
          __dirname,
          RELATIVE_PATH_TO_ROOT,
          "node_modules/emotion-theming"
        )
      ),
    };

    return config;
  },
};
