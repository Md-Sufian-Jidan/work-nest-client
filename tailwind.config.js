/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
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
        primary: '#3B82F6',         
        secondary: '#10B981',
        accent: '#F97316',
        'bg-soft': '#F3F4F6',
        'bg-dark': '#1F2937',
        'text-main': '#111827',
        'text-secondary': '#6B7280',
        btn: '#3B82F6',
        'btn-hover': '#2563EB',
        'card-bg': '#ffffff',
        'card-bg-dark': '#374151',
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

