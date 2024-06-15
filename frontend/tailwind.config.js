/** @type {import('tailwindcss').Config} */
// @ts-ignore
const withMT = require('@material-tailwind/react/utils/withMT');

// @ts-ignore
module.exports = withMT({
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      nav: '#242F9B',
      primary: '#646FD4',
      secondary: '#9BA3EB',
      tertiary: '#DBDFFD'
    },
    extend: {}
  },
  plugins: []
});
