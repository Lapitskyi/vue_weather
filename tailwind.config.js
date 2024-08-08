/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'linear-gradient': 'linear-gradient(#547ab9,#55ceaf)',
        'summer_banner': "url('/images/summer_banner.jpg')",
      },
      screens: {
        '991':'991px',
        'lg':'1200px',
        'xl':'1200px',
        '2xl':'1200px'
      }
    },
  },
  plugins: [],
}

