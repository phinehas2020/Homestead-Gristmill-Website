/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                cream: '#F9F7F2',
                bone: '#EBE8E0',
                forest: '#1A3A2A',
                loam: '#4A3B32',
                gold: '#D4AF37',
                clay: '#B45E44',
            },
            fontFamily: {
                serif: ['Fraunces', 'serif'],
                sans: ['Outfit', 'sans-serif'],
            },
            cursor: {
                none: 'none',
            },
            backgroundImage: {
                'grain': "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%221%22/%3E%3C/svg%3E')",
            }
        },
    },
    plugins: [],
}
