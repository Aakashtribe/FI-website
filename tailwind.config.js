/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#161512',
        panel: '#211f1b',
        cream: '#f2efe9',
      },
      fontFamily: {
        sans: ['"Google Sans Flex"', '"Inter"', 'system-ui', 'sans-serif'],
        gsans: ['"Google Sans Flex"', '"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
