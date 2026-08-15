/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        tzCyan: '#00f0ff',
        tzCyanGlow: '#00ffff88',
        tzDark: '#05070a',
        tzCard: 'rgba(10, 15, 26, 0.75)',
        tzCrimson: '#ff003c'
      },
      fontFamily: {
        sans: ['Barlow', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      }
    },
  },
  plugins: [],
}
