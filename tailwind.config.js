/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        meulen: {
          brown: '#8B7355',
          'brown-light': '#C4A57B',
          beige: '#E5D5C3',
          cream: '#F5E6D3',
          pink: '#E6B8B8',
          'dark-brown': '#3D2F1F',
        },
      },
      fontFamily: {
        'cormorant': ['Cormorant Garamond', 'serif'],
        'playfair': ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
