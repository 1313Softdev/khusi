import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#F0F4F8",
          100: "#D9E2EC",
          200: "#BCCCDC",
          300: "#9FB3C8",
          400: "#829AB1",
          500: "#627D98",
          600: "#486581",
          700: "#334E68",
          800: "#1B2A4A",
          850: "#13213B",
          900: "#0B192C",
          950: "#060D17",
        },
        saffron: {
          50: "#FFF8E1",
          100: "#FFECB3",
          200: "#FFE082",
          300: "#FFD54F",
          400: "#FFCA28",
          500: "#FFB300",
          600: "#FB8C00",
          700: "#F57C00",
          800: "#EF6C00",
          900: "#E65100",
        },
        gold: {
          300: "#FDE68A",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        gurmukhi: ["var(--font-gurmukhi)", "Noto Sans Gurmukhi", "Mukta Mahee", "sans-serif"],
        serif: ["var(--font-display)", "Cinzel", "Georgia", "serif"],
        display: ["var(--font-display)", "Cinzel", "Georgia", "serif"],
      },
      boxShadow: {
        'glow-saffron': '0 0 25px -4px rgba(245, 158, 11, 0.45)',
        'glow-saffron-lg': '0 0 40px -6px rgba(245, 158, 11, 0.6)',
        'glow-navy': '0 0 35px -5px rgba(11, 25, 44, 0.7)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
};
export default config;
