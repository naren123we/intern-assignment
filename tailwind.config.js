const defaultTheme=require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens:{
      'xs':'375px',
      ...defaultTheme.screens
    },
    extend: {
      fontFamily:{
        WorkSans:['Work Sans'],
        plexSans:['IBM Plex Sans'],
        rubik:['Rubik'],
      },
    },
  },
  plugins: [],
}