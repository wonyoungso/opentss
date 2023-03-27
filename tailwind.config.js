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
      'white': '#FFFFFF',
      'white-op-50': '#95969b',
      'white-op-10': '#95969b22',
      'light-blue': '#BEC2DA',
      'black': '#000000',
      'dark-blue-txt': '#202B62'
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

