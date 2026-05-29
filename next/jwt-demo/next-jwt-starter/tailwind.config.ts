import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './node_modules/lucide-react/dist/**/*.mjs',
  ],
  theme: { extend: {} },
  plugins: [],
} satisfies Config