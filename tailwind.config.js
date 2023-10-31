/** @type {import('tailwindcss').Config} */

export default {
  prefix: '',
  important: false,
  separator: ':',
  content: ['./src/**/*.vue'],
  theme: {
    extend: {
      colors: {
        primary: '#70C1B3',
        dark: '#30323D',
        'dark-darker': '#25272F',
        light: '#4D5061',
      },
    },
  },
  plugins: [],
}

