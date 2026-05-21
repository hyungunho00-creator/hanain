/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 기존 토큰 (D9 이전 호환 유지 — 절대 삭제 금지)
        'ocean-deep': '#0A1628',
        'ocean-mid': '#1a3a5c',
        'ocean-light': '#2a5480',
        'cyan-hana': '#00B4D8',
        'gold-hana': '#F0A500',
        'gray-hana': '#f8fafc',
        'border-hana': '#e2e8f0',
        // D10 추가: 밝은 연구실 느낌 보조 팔레트 ("신뢰가는 밝은 느낌")
        'lab-50':  '#F5FBFD', // 거의 흰색 + 미세 시안
        'lab-100': '#E6F6FA', // 밝은 시안 배경
        'lab-200': '#CAF0F8', // 부드러운 시안 (테두리)
        'lab-300': '#90E0EF', // 중간 시안 (액센트)
        'lab-400': '#48CAE4', // 진한 시안 (호버)
        'lab-500': '#00B4D8', // 메인 시안 (= cyan-hana)
        'lab-600': '#0096C7', // 진한 시안 (active)
        'lab-700': '#0077B6', // 짙은 블루
        'lab-800': '#023E8A', // 매우 짙은 블루
        'lab-900': '#03045E', // 거의 검정 블루
        'sand-50':  '#FFFBF5', // 따뜻한 화이트
        'sand-100': '#FFF4E6', // 따뜻한 액센트
        'coral-500': '#FF6B6B', // 임상 수치 강조 (염증 등)
        'emerald-fresh': '#10B981', // 긍정 수치 강조
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
        // D10 추가: 밝은 연구실 느낌 그라데이션
        'lab-gradient': 'linear-gradient(135deg, #F5FBFD 0%, #E6F6FA 50%, #CAF0F8 100%)',
        'lab-soft-gradient': 'linear-gradient(180deg, #FFFFFF 0%, #F5FBFD 100%)',
        'lab-hero-gradient': 'radial-gradient(ellipse at top right, #CAF0F8 0%, transparent 60%), radial-gradient(ellipse at bottom left, #E6F6FA 0%, transparent 50%), #FFFFFF',
      },
      boxShadow: {
        // D10 추가: 부드러운 연구실 카드 그림자
        'lab': '0 1px 3px 0 rgba(0, 119, 182, 0.06), 0 1px 2px -1px rgba(0, 119, 182, 0.04)',
        'lab-md': '0 4px 12px -2px rgba(0, 119, 182, 0.08), 0 2px 4px -1px rgba(0, 119, 182, 0.04)',
        'lab-lg': '0 12px 30px -8px rgba(0, 119, 182, 0.12), 0 6px 12px -4px rgba(0, 119, 182, 0.06)',
        'lab-glow': '0 0 0 1px rgba(0, 180, 216, 0.1), 0 8px 24px -8px rgba(0, 180, 216, 0.25)',
      },
    },
  },
  plugins: [],
}
