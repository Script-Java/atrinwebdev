/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Define custom colors based on the Atrin Web Dev Space Theme
      colors: {
        // Primary Backgrounds (Deep Space)
        'space-dark-blue': '#0A0B1A', // Very Dark Blue/Near Black
        'space-slate-blue': '#1C2036', // Dark Slate Blue/Deep Purple-Grey

        // Primary Text & Key Elements
        'space-white': '#FFFFFF',    // Pure White for headings/crucial text
        'space-light-grey': '#D0D4E0', // Light Grey/Silver for body text

        // Accent Colors (Cosmic Glow)
        'atrin-accent-purple': '#6A5ACD', // Slate Blue / MediumPurple - Primary accent
        'atrin-accent-teal': '#69F0AE',   // Bright Teal/Aqua - Secondary accent
      },
      // Define custom font families
      fontFamily: {
        // Primary font for body and general headings
        inter: ['Inter', 'sans-serif'],
        // Secondary font for unique headers or code (Outfit is more geometric, Space Mono for monospace)
        outfit: ['Outfit', 'sans-serif'],
        mono: ['Space Mono', 'monospace'], // Keep the default 'mono' for clarity, or rename
      },
      // You can add more extensions here like spacing, borderRadius, etc.
      // For example, subtle rounded corners:
      borderRadius: {
        'xl': '0.75rem', // Default Tailwind xl, ensuring consistency
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  // Keep your existing DaisyUI configuration
  daisyui: {
    themes: [
      'aqua',
      'black'
    ],
  },
  plugins: [require('daisyui'),require('@tailwindcss/typography')],
};
