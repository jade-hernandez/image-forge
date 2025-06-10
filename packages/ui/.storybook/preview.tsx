import React from 'react';

import { DocsContainer as BaseDocsContainer } from '@storybook/addon-docs';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import {
  ColorItem,
  ColorPalette,
  Controls,
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
} from '@storybook/blocks';
import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';
import { withPerformance } from 'storybook-addon-performance';

import { GlobalDecorator } from '../lib/storybook';
import '../styles/tailwind.css';

const CUSTOM_VIEWPORTS = {
  desktop720p: {
    name: 'Desktop 720p',
    styles: {
      height: '720px',
      width: '1280px',
    },
    type: 'desktop',
  },
  desktop1080p: {
    name: 'Desktop 1080p',
    styles: {
      height: '1080px',
      width: '1920px',
    },
    type: 'desktop',
  },
};

const SELECTED_VIEWPORTS = {
  iphone5: INITIAL_VIEWPORTS.iphone5,
  iphone6: INITIAL_VIEWPORTS.iphone6,
  iphone8p: INITIAL_VIEWPORTS.iphone8p,
  iphone12: INITIAL_VIEWPORTS.iphone12,
  ipad: INITIAL_VIEWPORTS.ipad,
  ipad10p: INITIAL_VIEWPORTS.ipad10p,
  ipad12p: INITIAL_VIEWPORTS.ipad12p,
  ...CUSTOM_VIEWPORTS,
};

const DocsContainer = ({ children, context }: any) => {
  const userPrefered = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [isDark, setIsDark] = React.useState(userPrefered);
  const globals = context.store.globals.globals;
  const docsIsDarkContext = globals.theme === 'dark';
  const canvasIsDarkContext = globals.darkMode;
  const theme = isDark ? themes.dark : themes.light;

  React.useEffect(() => {
    setIsDark(docsIsDarkContext || canvasIsDarkContext);
  }, [docsIsDarkContext, canvasIsDarkContext]);

  return (
    <BaseDocsContainer context={context} theme={theme}>
      {children}
    </BaseDocsContainer>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      controls: {
        sort: 'requiredFirst',
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
          <ColorPalette>
            <ColorItem
              title='Primary'
              subtitle='Foreground'
              colors={[`var(--primary)`, `var(--primary-foreground)`]}
            />
            <ColorItem
              title='Primary'
              subtitle='Foreground'
              colors={[`var(--secondary)`, `var(--secondary-foreground)`]}
            />
          </ColorPalette>
          <Stories />
        </>
      ),
      container: DocsContainer,
    },
    viewport: {
      viewports: SELECTED_VIEWPORTS,
    },
  },

  decorators: [withPerformance, GlobalDecorator],
  tags: ['autodocs'],
};

export default preview;
