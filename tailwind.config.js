/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*/.{html,js}"],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#3490dc',
      },
      fontSize: {
        '2xs': '.5rem',
      },
      backgroundColor: ['active'],
      textColor: ['hover', 'focus'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
  purge: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
}

