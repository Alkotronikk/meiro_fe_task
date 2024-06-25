/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            black: '#000',
            white: '#fff',
            primary: '#fc9f5d',
            secondary: '#fe8067',
            lightgray: '#f4f4f4',
            danger: '#ef4444',
            success: '#16a34a'
        }
    },
  plugins: [],
}

