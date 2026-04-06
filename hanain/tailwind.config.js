/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ocean-deep': '#0A1628',
        'ocean-mid': '#1a3a5c',
        'ocean-light': '#2a5480',
        'cyan-hana': '#00B4D8',
        'gold-hana': '#F0A500',
        'gray-hana': '#f8fafc',
        'border-hana': '#e2e8f0',
      },
      fontFamily: {
        sans: ['Noto Sans KR', 'sans-serif'],
      },
      animation: {
        'wave': 'wave 6s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'count-up': 'countUp 2s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0, 180, 216, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 180, 216, 0.8)' },
        },
      },
      backgroundImage: {
        'ocean-gradient': 'linear-gradient(135deg, #0A1628 0%, #1a3a5c 50%, #0A1628 100%)',
        'cyan-gradient': 'linear-gradient(135deg, #00B4D8, #0077B6)',
        'gold-gradient': 'linear-gradient(135deg, #F0A500, #E07B00)',
      }
    },
  },
  plugins: [],
}
