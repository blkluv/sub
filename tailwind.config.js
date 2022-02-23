const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    minHeight: {
      '1/2': '50%',
      '3/4': '75%'
    },
    extend: {
      colors: {
        'pinata-purple': '#8000DB',
        'pinata-light-blue': '#E9FCFF',
        'muted': '#636363'
      },
    },
    fontFamily: {
      sans: ['Inter var', ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
}
