// See the Tailwind default theme values here:
// https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  // Opt-in to TailwindCSS future changes
  future: {
  },

  // https://tailwindcss.com/docs/just-in-time-mode
  mode: 'jit',

  // plugins: [
  //   require('@tailwindcss/aspect-ratio'),
  //   require('@tailwindcss/forms')({ strategy: 'class' }),
  //   require('@tailwindcss/line-clamp'),
  //   require('@tailwindcss/typography'),
  // ],

  // Purge unused TailwindCSS styles
  purge: {
    content: [
      './app/helpers/**/*.rb',
      './app/javascript/**/*.js',
      './app/views/**/*.erb',
    ],
  },

  // All the default values will be compiled unless they are overridden below
  theme: {
    // Extend (add to) the default theme in the `extend` key
    extend: {
      // Create your own at: https://javisperez.github.io/tailwindcolorshades
      colors: {
        orange: colors.orange,
        sky: colors.sky,
        primary: colors.blue,
        secondary: colors.emerald,
        tertiary: colors.gray,
        danger: colors.red,
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    borderWidth: ['responsive', 'last', 'hover', 'focus'],
  },
}
