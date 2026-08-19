/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        roar: {
          blue: {
            DEFAULT: '#0066FF',
            dark: '#0A2540',
            deep: '#06192E',
            light: '#E6F0FF',
            hover: '#0052CC',
          },
          yellow: {
            DEFAULT: '#FFA800',
            bright: '#FFB800',
            light: '#FFF8E6',
            hover: '#E69700',
          },
          navy: '#0A2540',
          gray: {
            50: '#F8FAFC',
            100: '#F1F5F9',
            200: '#E2E8F0',
            700: '#334155',
            900: '#0F172A',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 10px 30px -5px rgba(10, 37, 64, 0.08)',
        'card-hover': '0 20px 40px -10px rgba(0, 102, 255, 0.15)',
        'glass': '0 8px 32px 0 rgba(10, 37, 64, 0.1)',
      }
    },
  },
  plugins: [],
}
