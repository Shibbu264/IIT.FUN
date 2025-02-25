import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primaryGreen: "var(--primaryGreen)",
        secondaryGreen: "var(--secondaryGreen)",
        primaryBlack: "var(--primaryBlack)",
        secondaryBlack: "var(--secondaryBlack)",
        primaryWhite: "var(--primaryWhite)",
        primaryGray: "var(--primaryGray)",
        bgBlack: "var(--bgBlack)"
      },
    },
  },
  plugins: [],
} satisfies Config;
