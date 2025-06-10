import type { StorybookConfig } from "@storybook/react-vite";
import path, { dirname, join } from "path";

import { mergeConfig } from "vite";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
const config: StorybookConfig = {
  stories: [
    "../storybook/*.mdx",
    "../storybook/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    {
      name: "@storybook/addon-coverage",
      options: {
        istanbul: {
          include: ["**/stories/**"],
        },
      },
    },
    {
      name: "@storybook/addon-essentials",
      options: {
        backgrounds: false,
      },
    },
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("storybook-addon-performance"),
    "@chromatic-com/storybook",
  ],
  core: {
    disableTelemetry: true,
    disableWhatsNewNotifications: true,
  },
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  docs: {
    defaultName: "Documentation",
  },
  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
  },
  swc: () => ({
    jsc: {
      transform: {
        react: {
          runtime: "automatic",
        },
      },
    },
  }),
};

config.viteFinal = async (config, { configType }) => {
  return mergeConfig(config, {
    resolve: {
      alias: {
        "@/components": path.resolve(__dirname, "../components"),
        "@/hooks": path.resolve(__dirname, "../hooks"),
        "@/lib": path.resolve(__dirname, "../lib"),
        "@/styles": path.resolve(__dirname, "../styles"),
      },
    },
  });
};

export default config;
