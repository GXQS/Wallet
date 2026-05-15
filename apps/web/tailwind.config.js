/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        gxqs: {
          bg: '#0a0a0f', // deep dark base
          surface: '#111118', // slightly lighter surface
          border: '#1e2640',
          primary: '#00ffe1', // Exployer teal / neon cyan
          secondary: '#7b2fff',
          accent: '#ff00d4', // Exployer magenta
          success: '#00ff94',
          warning: '#ff9500',
          danger: '#ff3b5c',
          muted: '#4a5578',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'monospace'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
        'glow-accent': 'glow-accent 2s ease-in-out infinite alternate',
        'scan-line': 'scan-line 4s linear infinite',
      },
      keyframes: {
        glow: {
          from: { boxShadow: '0 0 5px #00ffe140, 0 0 10px #00ffe120' },
          to: { boxShadow: '0 0 20px #00ffe180, 0 0 40px #00ffe140' },
        },
        'glow-accent': {
          from: { boxShadow: '0 0 5px #ff00d440, 0 0 10px #ff00d420' },
          to: { boxShadow: '0 0 20px #ff00d480, 0 0 40px #ff00d440' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
  screens: {
    xs: '320px',
    sm: '480px',
    md: '768px',
    lg: '1024px',
    xl: '1440px',
    '2xl': '1920px',
  },
  spacing: {
    xs: 'clamp(0.5rem, 1vw, 1rem)',
    sm: 'clamp(1rem, 2vw, 2rem)',
    md: 'clamp(2rem, 4vw, 4rem)',
    lg: 'clamp(4rem, 6vw, 6rem)',
    xl: 'clamp(6rem, 8vw, 8rem)',
  },
  fontSize: {
    xs: 'clamp(0.75rem, 1vw, 1rem)',
    sm: 'clamp(1rem, 1.5vw, 1.25rem)',
    md: 'clamp(1.25rem, 2vw, 1.5rem)',
    lg: 'clamp(1.5rem, 2.5vw, 2rem)',
    xl: 'clamp(2rem, 3vw, 2.5rem)',
  },
};
