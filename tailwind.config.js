import { heroui } from '@heroui/react';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gandalf: {
          pink: '#f8b4d4',
          'pink-strong': '#ec4899',
          violet: '#8b5cf6',
          'violet-light': '#a78bfa',
          green: '#34d399',
          blue: '#3b82f6',
          surface: '#faf8ff',
          cream: '#fef7f9',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 15px -3px rgba(139, 92, 246, 0.08), 0 4px 20px -2px rgba(139, 92, 246, 0.06)',
        glow: '0 0 24px -4px rgba(236, 72, 153, 0.35), 0 0 40px -8px rgba(139, 92, 246, 0.2)',
        card: '0 4px 24px -4px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        '3xl': '1.25rem',
        '4xl': '1.5rem',
      },
    },
  },
  darkMode: 'class',
  plugins: [heroui()],
};
