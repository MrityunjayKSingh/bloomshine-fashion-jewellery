/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F7F3EC',
        'warm-white': '#FDFAF5',
        bark: '#3D2B1F',
        soil: '#6B4C35',
        moss: '#5C6B45',
        sage: '#8A9B72',
        sand: '#C8A97E',
        terracotta: '#C4714A',
        linen: '#EDE3D3',
        muted: '#9A8B7B',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
