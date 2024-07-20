/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        JetBrainsMono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        "hrh-bg": "#23272e",
        "hrh-dark-blue": "#79b6fb",
        "hrh-light-blue": "#a0cffc",
        "hrh-white": "#afbac6",
        "hrh-muted": "#78838f",
        "hrh-green": "#6aa760",
      },
    },
  },
  plugins: [],
};
