import typescript from "@rollup/plugin-typescript";
import react, { BabelOptions } from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export const babelOptions: BabelOptions = {
  plugins: [
    [
      "@emotion",
      {
        sourceMap: true,
        autoLabel: "always",
        labelFormat: "[filename]-[local]",
        cssPropOptimization: true,
      },
    ],
  ],
};

export default defineConfig(async () => ({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      fileName: "index",
      formats: ["es", "umd"],
      name: "monorepo-components",
    },
    outDir: "./dist",
    emptyOutDir: false,
    sourcemap: true,
    rollupOptions: {
      // Externalize deps that shouldn't be bundled
      external: ["react", "react-dom", "@emotion/styled"],
      output: {
        // Global vars to use in UMD build for externalized deps
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
      plugins: [
        typescript({
          tsconfig: "./tsconfig.build.json",
          outputToFilesystem: true
        }),
      ],
    },
  },
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: babelOptions,
    }),
  ],
}));
