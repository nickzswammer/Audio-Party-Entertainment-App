module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        half: "43rem",
        customlogin: "28rem",
      },
      transitionDelay: {
        40: "40ms",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
