/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#c0c1ff',
        'primary-dim': '#8083ff',
        tertiary: '#3cddc7',
        'surface': '#0b1326',
        'surface-container': '#171f33',
        'surface-low': '#131b2e',
        'surface-high': '#222a3d',
        'on-surface': '#dae2fd',
        'outline': '#464554',
        'secondary-container': '#3a4a5f',
        'on-secondary': '#b7c8e1',
      },
      fontFamily: {
        headline: ['Syne', 'sans-serif'],
        body: ['Space Grotesk', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
