const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    minHeight: {
      '1/2': '50%',
      '3/4': '75%', 
      'screen': '100vh',
    },
    maxHeight: {
      "3/4": '75%',
    },
    extend: {
      colors: {
        'pinata-purple': '#8000DB',
        'pinata-light-blue': '#E9FCFF',
        'muted': '#636363'
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
    },
    fontFamily: {
      sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      'Roboto': ['Roboto', ...defaultTheme.fontFamily.sans], 
      OpenSans: ['Open Sans', ...defaultTheme.fontFamily.sans], 
      Montserrat: ['Montserrat', ...defaultTheme.fontFamily.sans], 
      Oswald: ['Oswald', ...defaultTheme.fontFamily.sans], 
      RobotoCondensed: ['Roboto Condensed', ...defaultTheme.fontFamily.sans], 
      SourceSansPro: ['Source Sans Pro', ...defaultTheme.fontFamily.sans], 
      Lato: ['Lato', ...defaultTheme.fontFamily.sans]
    },
  },
  plugins: [],
}
