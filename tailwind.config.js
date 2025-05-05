/** @type {import('tailwindcss').Config} */

import colors from 'tailwindcss/colors';
import {appColors} from './src/config/appColors';

export default {
  content: ['./src/**/*.{jsx,js,tsx}', './src/modules/**/*.{jsx,js,tsx}'],
  theme: {
    extend: {
      colors: {
        ...colors,
        ...appColors
      }
    },
  },
  plugins: [],
  darkMode: 'selector',
};