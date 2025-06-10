import { DocsContainer as BaseDocsContainer } from "@storybook/addon-docs";
import { themes } from "@storybook/theming";
import React, { memo, useEffect, useState } from "react";

interface DocsContainerProps {
  children: React.ReactNode;
  context: any;
}

export const CustomDocsContainer = memo(function DocsContainer({
  children,
  context
}: DocsContainerProps) {
  const userPrefered = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useState(userPrefered);
  const globals = context.store.globals.globals;
  const docsIsDarkContext = globals.theme === "dark";
  const canvasIsDarkContext = globals.darkMode;
  const theme = isDark ? themes.dark : themes.light;

  useEffect(() => {
    setIsDark(docsIsDarkContext || canvasIsDarkContext);
  }, [docsIsDarkContext, canvasIsDarkContext]);

  return (
    <BaseDocsContainer
      context={context}
      theme={theme}
    >
      {children}
    </BaseDocsContainer>
  );
});
