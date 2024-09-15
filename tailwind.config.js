import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: "class",
  theme: {
    screens: {
        sm: "320px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
      },
      fontSize: {
        xxs: "0.625rem", // 10px
        display: ["3.5rem", 1],
        "2xxl": ["1.75rem", "2rem"],
        "3xxl": ["2.125rem", "2.25rem"],
        "4xxl": ["2.5rem", "2.75rem"],
      },
      inset: {
        pad: "var(--pad)",
        "pad-2x": "var(--pad-2x)",
        "pad-3x": "var(--pad-3x)",
        "pad-4x": "var(--pad-4x)",
      },
      paddingX: {
        pad: "var(--pad)",
        "pad-2x": "var(--pad-2x)",
        "pad-3x": "var(--pad-3x)",
        "pad-4x": "var(--pad-4x)",
      },
      spacing: {
        display: "4rem",
        pad: "var(--pad)",
        "pad-2x": "var(--pad-2x)",
        "pad-3x": "var(--pad-3x)",
        "pad-4x": "var(--pad-4x)",
      }
    },
  },
  plugins: [
      nextui({
          defaultTheme: "light",
          defaultExtendTheme: "light",
          layout: {},
          themes: {
              light: {
                  colors: {
                      background: "#FFFFFF",
                      foreground: "#000000",
                      primary: {
                          DEFAULT: "#FFFFFF",
                          foreground: "#000000",
                          50: "#FAFAFA",
                          100: "#F4F4F5",
                          200: "#E4E4E7",
                          300: "#D4D4D8",
                          400: "#A1A1AA",
                          500: "#71717A",
                          600: "#52525B",
                          700: "#3F3F46",
                          800: "#27272A",
                          900: "#18181B",
                      }
                  }
              },
              dark: {
                  colors: {
                      background: "#000000",
                      foreground: "#FFFFFF",
                      primary: {
                          DEFAULT: "#000000",
                          foreground: "#FFFFFF",
                          50: "#18181B",
                          100: "#27272A",
                          200: "#3F3F46",
                          300: "#52525B",
                          400: "#71717A",
                          500: "#A1A1AA",
                          600: "#D4D4D8",
                          700: "#E4E4E7",
                          800: "#F4F4F5",
                          900: "#FAFAFA",
                      }
                  }
              },
          },
      }),
  ],
}
