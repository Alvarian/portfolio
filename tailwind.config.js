const plugin = require('tailwindcss/plugin')

const backfaceVisibility = plugin(function({addUtilities}) {
  addUtilities({
    '.backfaceVisible': {
      'backface-visibility': 'visible',
    },
    '.backfaceHidden': {
      'backface-visibility': 'hidden',
    }
  })
});


module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './shared/**/*.{js,ts,jsx,tsx}',
    './sections/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      width: {
        '128': '32rem',
        'inherit': 'inherit'
      },
      height: {
        'inherit': 'inherit',
        'section': '900px'
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
    [backfaceVisibility]
  ],
  variants: {
    'margin': ['hover'],
    'margin': ['responsive', 'hover'],
  }
}
