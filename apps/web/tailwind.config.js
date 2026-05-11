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
          primary: '#00d4ff',
          secondary: '#7b2fff',
          accent: '#00ff94',
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
      },
      keyframes: {
        glow: {
          from: { boxShadow: '0 0 5px #00d4ff40, 0 0 10px #00d4ff20' },
          to: { boxShadow: '0 0 20px #00d4ff80, 0 0 40px #00d4ff40' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
