/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'xs': '0.75rem',     // You can override existing sizes
        'sm': '0.875rem',    // Or add new sizes
        'tiny': '0.625rem',  // Custom size
        'base': '1rem',      // Base size
        'lg': '1.125rem',    // Larger size
        'xl': '1.25rem',     // Extra large size
        '2xl': '1.5rem',     // 2 times extra large size
        '3xl': '1.875rem',   // 3 times extra large size
        '4xl': '2.25rem',    // 4 times extra large size
        '5xl': '3rem',       // 5 times extra large size
        '6xl': '4rem',       // 6 times extra large size
        'custom-size': '2.5rem'  // Your custom size
      },

    },
  },
  plugins: [require("tailwind-scrollbar")],
 
}

