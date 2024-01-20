/** @type {import('tailwindcss').Config} */

export default {
  prefix: '',
  important: false,
  separator: ':',
  content: ['./src/**/*.vue'],
  theme: {
    extend: {
      colors: {
        primary: '#34B1E8',
        'primary-dark': '#117099',
        'gray-lighter': '#999999',
        'gray-light': '#3F3F46',
        gray: '#27272A',
        'gray-dark': '#18181B',
        'gray-darker': '#09090B',
      },
    },
  },
  plugins: [],
}

