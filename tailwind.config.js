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
      keyframes: {
        pulse2: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        pulse2: "pulse2 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
