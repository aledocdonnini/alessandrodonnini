
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class' or false
  theme: {
    colors: {
      white: "#eee",
      black: "#222",
      gray: "#333",
      grayM: "#444",
      grayL: "#cccccc",
      primary: "#575CE8",
      secondary: "#FD7CFF",
    },
    fontFamily: {
      'sans': ['Inter'],
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      typography: {
        DEFAULT: {
          css: {
            'max-width': '100%',
            'p': {
              'letter-spacing': '.015rem',
              'line-height': '26px',
            },
          },
        },
      },
    }
  },
};

