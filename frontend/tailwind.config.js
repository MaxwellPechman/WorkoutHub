/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/*.{html,js,ts,jsx,tsx}",
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./src/**/**/*.{html,js,ts,jsx,tsx}",
    "./src/**/**/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "barlow-semi-condensed": ["Barlow Semi Condensed"],
      }
    },
  },
  plugins: [],
}

