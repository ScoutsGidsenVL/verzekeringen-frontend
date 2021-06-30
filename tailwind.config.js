module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      black: {
        DEFAULT: "#212529",
      },
      white: {
        DEFAULT: "#FFFFFF",
      },
      lightGray: {
        DEFAULT: "#ECECEC",
      },
      gray: {
        DEFAULT: "#f9f9f9",
      },
      lightGreen: {
        DEFAULT: "#C7D121",
      },
      lighterGreen: {
        DEFAULT: "#F4F5D4",
      },
      red: {
        DEFAULT: "#E00A1E",
      },
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
    extend: {
      gridTemplateColumns: {
        list: "25% 30% 25% 15% 5%",
      },
      screens: {
        smo: { min: "0px", max: "768px" },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
