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
      'white-op-50': '#999999',
      'white-op-10': '#99999922',
      'light-blue': '#DCE0F8',
      'black': '#000000',
      'dark-blue': '#202B62'
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

