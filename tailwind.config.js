/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F4C81',
          50:  '#E8F1FA',
          100: '#C5D9F0',
          200: '#8FB8E3',
          300: '#5A97D6',
          400: '#2E77C9',
          500: '#0F4C81',
          600: '#0C3D68',
          700: '#092E4F',
          800: '#061F36',
          900: '#030F1C',
        },
        secondary: {
          DEFAULT: '#2E7D32',
          50:  '#E8F5E9',
          100: '#C8E6C9',
          200: '#A5D6A7',
          300: '#81C784',
          400: '#66BB6A',
          500: '#2E7D32',
          600: '#256427',
          700: '#1B4B1D',
          800: '#123213',
          900: '#091909',
        },
        accent: {
          DEFAULT: '#D4A017',
          50:  '#FDF8E8',
          100: '#F9EFC5',
          200: '#F3DF8A',
          300: '#EDD050',
          400: '#E7C025',
          500: '#D4A017',
          600: '#AA8012',
          700: '#7F600E',
          800: '#554009',
          900: '#2A2005',
        },
        gov: {
          blue: '#0F4C81',
          green: '#2E7D32',
          gold: '#D4A017',
          bg: '#F8FAFC',
          text: '#1E293B',
        }
      },
      fontFamily: {
        sans: ['Noto Sans', 'sans-serif'],
        amharic: ['Noto Sans Ethiopic', 'Noto Sans', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'counter': 'counter 2s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'gov': '0 4px 20px rgba(15, 76, 129, 0.12)',
        'gov-lg': '0 8px 40px rgba(15, 76, 129, 0.18)',
        'card': '0 2px 12px rgba(30, 41, 59, 0.08)',
        'card-hover': '0 8px 30px rgba(30, 41, 59, 0.16)',
      },
    },
  },
  plugins: [],
}
