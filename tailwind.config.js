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
      'sat-blue': "#3632DC",
      'black': '#000000',
      'dark-blue': '#202B62',
      'dark-blue-op-20': '#202B6222',
      'dark-blue-op-10': '#202B6210',
      'red': '#FF0000',
      'accepted': '#607EE3',
      'denied': '#FF7721',
      'bright-blue': '#EEF1FB',
      'gray': '#BBBBBB',
      'dark-gray': '#888888',
      'gray-border': 'rgba(0, 0, 0, 0.2)',
      'yellow': '#f8c330',
      'accepted': 'rgba(88, 86, 234, 0.2)',
      'denied': 'rgba(150, 150, 150, 0.2)',
      'very-dark-blue': '#000928'
    },
    fontFamily: {
      'sans': ["Sohne", "sans-serif"],
    },
    extend: {
      transitionDuration: {
        '2000': '2000ms',
      }
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

