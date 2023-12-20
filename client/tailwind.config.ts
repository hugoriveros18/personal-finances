import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#1c2434',
        'menu-title': 'rgb(138, 153, 175)',
        'menu-item': 'rgb(222, 228, 238)',
        'menu-item-selected': 'rgb(51, 58, 72)',
        'card-border': 'rgb(226, 232, 240)'
      },
      boxShadow: {
        'topBanner': '0px 1px 4px rgba(0,0,0,.12)'
      }
    },
  },
  plugins: [],
}
export default config
