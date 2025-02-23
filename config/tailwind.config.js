/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './app/views/**/*.{html,html.erb,erb}',
    './app/views/devise/**/*.{html,html.erb,erb}',
    './app/javascript/components/**/*.{vue,js,ts,jsx,tsx}',
    './app/javascript/**/*.{vue,js,ts,jsx,tsx}',
    './app/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      'dark-blue-bg': '#2C2E38',
      'white-bg': '#FAFBFD',
      'white': '#FFFFFF',
      'white-op-70': '#555555',
      'white-op-50': '#999999',
      'white-op-10': '#99999922',
      'white-op-30': '#99999955',
      'light-blue': '#DCE0F8',
      'black': '#000000',
      'dark-blue': '#202B62',
      'dark-blue-op-20': '#202B6222',
      'dark-blue-op-10': '#202B6210',
      'red': '#FF0000',
      'accepted': '#607EE3',
      'denied': '#FF7721',
      'bright-blue': '#EEF1FB',
      'gray': '#BBBBBB',
      'yellow': '#f8c330',
      'very-dark-blue': '#000928'
    },
    fontFamily: {
      'sans': ["Sohne", "sans-serif"],
    },
    extend: {
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
}

