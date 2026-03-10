/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#050404",
        ash: "#0d0b0b",
        stone: "#1a1614",
        fog: "#1c1410",
        ember: "#c8963e",
        grace: "#f0c060",
        rune: "#e8a020",
        mist: "rgba(200,150,62,0.08)",
        "text-main": "#d4c4a0",
        "text-dim": "#7a6a50",
        blood: "#6b1a1a",
        soul: "#4a7fa8",
      },
      fontFamily: {
        cinzel: ['var(--font-cinzel)', 'serif'],
        crimson: ['var(--font-crimson)', 'serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
