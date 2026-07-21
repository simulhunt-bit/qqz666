/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#14213D",
        inksoft: "#3A4666",
        paper: "#EEF1F4",
        papercard: "#FFFFFF",
        mango: "#F2A93B",
        mangodeep: "#D98F1E",
        tealc: "#1F9E89",
        tealdeep: "#167A69",
        line: "#D6DCE4",
      },
      fontFamily: {
        disp: ['"Space Grotesk"', "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ['"IBM Plex Mono"', "monospace"],
      },
      backgroundImage: {
        grid: "linear-gradient(#D6DCE4 1px, transparent 1px), linear-gradient(90deg, #D6DCE4 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "48px 48px",
      },
    },
  },
  plugins: [],
};
