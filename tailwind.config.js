/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors for industry-standard feel
        'primary': '#0f172a',    // Dark navy
        'secondary': '#1e293b',   // Slightly lighter navy
        'accent': '#6366f1',      // Indigo (modern tech)
        'success': '#22c55e',
        'warning': '#f59e0b',
        'danger': '#ef4444',
        'neutral': '#94a3b8'
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' }
        }
      },
      spacing: {
        'safe': 'max(1rem, env(safe-area-inset-bottom))'
      }
    }
  },
  plugins: [
    require('tailwindcss-animate')
  ]
};
