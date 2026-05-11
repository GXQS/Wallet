/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        gxqs: {
          bg: '#060a14',
          surface: '#0d1424',
          border: '#1a2540',
          primary: '#00ffe1', // Exployer teal
          secondary: '#7b2fff',
          accent: '#ff00d4', // Exployer magenta
          success: '#00ff94',
          warning: '#ff9500',
          danger: '#ff3b5c',
          muted: '#4a5568',
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
};
