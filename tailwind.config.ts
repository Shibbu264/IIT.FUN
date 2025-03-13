import type { Config } from "tailwindcss";

export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			boxShadow: {
				'custom': '0px 0px 10px rgba(0, 0, 0, 0.1)', // Custom shadow
			},
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				primaryGreen: "var(--primaryGreen)",
				secondaryGreen: "var(--secondaryGreen)",
				primaryBlack: "var(--primaryBlack)",
				secondaryBlack: "var(--secondaryBlack)",
				primaryWhite: "var(--primaryWhite)",
				primaryGray: "var(--primaryGray)",
				secondaryGray: "var(--secondaryGray)",
				bgBlack: "var(--bgBlack)",
				gray: "var(--systemGray)"
			},
			card: {
				DEFAULT: '(var(--card))',
				foreground: '(var(--card-foreground))'
			},
			popover: {
				DEFAULT: '(var(--popover))',
				foreground: '(var(--popover-foreground))'
			},
			primary: {
				DEFAULT: '(var(--primary))',
				foreground: '(var(--primary-foreground))'
			},
			secondary: {
				DEFAULT: '(var(--secondary))',
				foreground: '(var(--secondary-foreground))'
			},
			muted: {
				DEFAULT: '(var(--muted))',
				foreground: '(var(--muted-foreground))'
			},
			accent: {
				DEFAULT: '(var(--accent))',
				foreground: '(var(--accent-foreground))'
			},
			destructive: {
				DEFAULT: '(var(--destructive))',
				foreground: '(var(--destructive-foreground))'
			},
			border: '(var(--border))',
			input: '(var(--input))',
			ring: '(var(--ring))',
			chart: {
				'1': '(var(--chart-1))',
				'2': '(var(--chart-2))',
				'3': '(var(--chart-3))',
				'4': '(var(--chart-4))',
				'5': '(var(--chart-5))'
			},
		},
	},
	keyframes: {
		'mirror-flip': {
			'0%, 100%': {
				transform: 'scaleX(1)'
			},
			'50%': {
				transform: 'scaleX(-1)'
			}
		}
	},
	animation: {
		'mirror-flip': 'mirror-flip 4s ease-in-out infinite',
		spin: 'spin 1s linear infinite',
		'spin-slow': 'spin 3s linear infinite'
	},
	plugins: [require("tailwindcss-animate")]
} satisfies Config;
