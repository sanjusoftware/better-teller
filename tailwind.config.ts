import flowbitePlugin from 'flowbite/plugin'
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}',
    './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}',
    "./node_modules/flowbite-svelte-icons/**/*.{html,js,svelte,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        // DSK Green
        primary: {
          '50': '#f0fbea',
          '100': '#ddf5d2',
          '200': '#c0ebab',
          '300': '#97dd79',
          '400': '#73cc4f',
          '500': '#52ae30',
          '600': '#3e8d23',
          '700': '#316c1f',
          '800': '#2b561e',
          '900': '#264a1d',
          '950': '#10280b',
        },

      }
    }
  },

  plugins: [typography, forms, containerQueries, flowbitePlugin]
} satisfies Config;
