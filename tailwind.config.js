module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './UI/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      width: {
        '128': '32rem',
        'inherit': 'inherit'
      },
      height: {
        'inherit': 'inherit'
      },
      top: {
        '34': '8.5rem'
      },
      minWidth: {
        'mobile': '600px'
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
