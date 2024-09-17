/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'mono': ['Jetbrains Mono', 'monospace'],
      'sans': ['Prompt', 'sans-serif'],
      'display': ['Bungee'],
    },
    extend: {
      backgroundImage: {
        'PvE': "url('/assets/xp_wallpaper.jpg')",
        // 'PvP'
      },
      keyframes: {
        sine: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(0, 30%)' },
        }
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ['cupcake'],
  },
}