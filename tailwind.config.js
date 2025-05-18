/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#2563EB',
        secondary: '#10B981',
        accent: '#F59E0B',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem'
      },
      boxShadow: {
        card: '0 4px 20px rgba(0, 0, 0, 0.08)'
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

