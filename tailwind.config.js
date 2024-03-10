/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#3e8fb0',
        'custom-grey': '#f5f5f5',
        'custom-purple': '#6a0572',
        'custom-orange': '#ff7f50',
      },
    },
  },
  plugins: [],
}

