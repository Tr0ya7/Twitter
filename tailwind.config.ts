import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        defaultWhite: '#e7e9ea',
        defaultBlue: '#308cd8',
        defaultBorder: '#2f3336',
        defaultLightGray: '#71767b',
        defaultDarkGray: '#17181c'
      },
    },
  },
  plugins: [],
} satisfies Config;
