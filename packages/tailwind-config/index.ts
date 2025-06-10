// index.ts
import type { Config } from 'tailwindcss';

import { animation, keyframes } from './animation';
import { colors, fonts } from './colors';

export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors,
      keyframes,
      animation,
      fontFamily: fonts,
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-subtle':
          'linear-gradient(180deg, theme(colors.neutral.100 / 50%) 0%, theme(colors.neutral.100 / 0%) 48.32%)',
        'gradient-subtle-dark':
          'linear-gradient(180deg, theme(colors.neutral.900 / 50%) 0%, theme(colors.neutral.900 / 0%) 48.32%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
} satisfies Config;
