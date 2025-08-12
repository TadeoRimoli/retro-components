/** @type {import('tailwindcss').Config} */

const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "y2k-blue": "#0080ff",
        "y2k-blue-light": "#4da9ff",
        "y2k-blue-dark": "#0066cc",
      
        "y2k-pink": "#ff40a0",
        "y2k-pink-light": "#ff80bf",
        "y2k-pink-dark": "#cc0066",
      
        "y2k-green": "#00FF9C",
        "y2k-green-light": "#66FFC2",
        "y2k-green-dark": "#00CC7A",
      
        "y2k-lime": "#99cc00",
        "y2k-lime-light": "#ccff00",
        "y2k-lime-dark": "#669900",
      
        "y2k-silver": "#d9d9d9",
        "y2k-silver-light": "#f0f0f0",
        "y2k-silver-dark": "#a6a6a6",
      }
      ,
      boxShadow: {
        "y2k": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), inset 0 1px 1px 0 rgba(255, 255, 255, 0.5)",
        "y2k-inset": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)",
        "y2k-inner": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.25)",
        "y2k-outer": "0 2px 4px 0 rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)",
        "y2k-button": "0 2px 0 0 rgba(0, 0, 0, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.4)",
        "y2k-card": "0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05)",
      },
      fontFamily: {
        y2k: ["Orbitron", "sans-serif"],
      },
    },
  },
  plugins: [],
}
export default config
