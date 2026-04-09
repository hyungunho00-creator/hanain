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
      // 모바일 가독성: 전체 폰트 크기 1단계 상향
      // xs=14, sm=16, base=18, lg=20, xl=22, 2xl=26, 3xl=32, 4xl=40
      fontSize: {
        'xs':   ['0.875rem', { lineHeight: '1.6' }],   // 14px (기존 12px)
        'sm':   ['1rem',     { lineHeight: '1.7' }],   // 16px (기존 14px)
        'base': ['1.125rem', { lineHeight: '1.75' }],  // 18px (기존 16px)
        'lg':   ['1.25rem',  { lineHeight: '1.75' }],  // 20px (기존 18px)
        'xl':   ['1.375rem', { lineHeight: '1.7' }],   // 22px (기존 20px)
        '2xl':  ['1.625rem', { lineHeight: '1.4' }],   // 26px (기존 24px)
        '3xl':  ['2rem',     { lineHeight: '1.3' }],   // 32px (기존 30px)
        '4xl':  ['2.5rem',   { lineHeight: '1.2' }],   // 40px (기존 36px)
        '5xl':  ['3rem',     { lineHeight: '1.1' }],   // 48px
        '6xl':  ['3.75rem',  { lineHeight: '1.05' }],  // 60px
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
