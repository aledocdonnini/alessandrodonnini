module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "media", // or 'media' or 'class' or false
  theme: {
    colors: {
      white: "#eee",
      black: "#111",
      gray: "#333",
      grayM: "#444",
      grayL: "#cccccc",
      primary: "#575CE8",
      secondary: "#FD7CFF",
    },
    fontFamily: {
      sans: ["Inter"],
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    animation: {
      pulse: "pulse 1s ease-in-out infinite",
    },
    keyframes: {
      pulse: {
        "0%, 25%, 75%, 100%": { opacity: "1" },
        "50%": { opacity: "0" },
      },
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      typography: {
        DEFAULT: {
          css: {
            "max-width": "100%",
            p: {
              "letter-spacing": ".015rem",
              "line-height": "26px",
            },
          },
        },
      },
    },
  },
};
