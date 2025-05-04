import type { Config } from "tailwindcss";

export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",

		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				nunito: ['Nunito']
			},
			screens: {
				tab: '900px',
				xs: '500px'
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
				'nautical-blue': {
					'10': '#ebf1fc',
					'30': '#BCCBF5',
					'50': '#A2B9F3',
					'80': '#7A9BEB',
					'100': '#5A7EDD',
					'200': '#305DCF',
					'300': '#1247BA',
					'400': '#0F3EA3',
					'500': '#0D348C',
					'600': '#0A2A75',
					'700': '#061B4E',
					'800': '#010851',
					'900': '#04113A',
					'950': '#020B2C'
				},
				dark: '#0f172a',
				neutral: '#374151',
				light: '#737373',
				blueDark: '#010851',
				blueMedium: '#0F3EA3',
				blueLight: '#ebf1fc',
				muiLight: '#C4C4C4',
				'muted-background': '#f9fafb',
				muted: '#F5F5F5',
				'muted-foreground': '#eeeeee',
				amber: '#d97706',
				success: '#297a2d',
				emerald: '#16c098',
				error: '#c32c2c',
				link: '#1247ba',
				purpleDark: '#6E33C2'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontSize: {
				title: ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '2.5rem', letterSpacing: '0.02em', fontWeight: '800' }],
				h1: ['clamp(1.25rem, 3vw, 1.75rem)', { lineHeight: '2rem', letterSpacing: '0.02em', fontWeight: '700' }],
				h2: ['clamp(1.2rem, 3vw, 1.5rem)', { lineHeight: '2rem', letterSpacing: '0.02em', fontWeight: '700' }],
				h5: ['clamp(1rem, 3vw, 1.125rem)', { lineHeight: '1.5rem', letterSpacing: '0.03em', fontWeight: '600' }],
				h6: ['clamp(0.925rem, 3vw, 0.975rem)', { lineHeight: '1.5rem', letterSpacing: '0.02em', fontWeight: '600' }],
				label: ['clamp(0.85rem, 3vw, 0.85rem)', { lineHeight: '1.25rem', letterSpacing: '0.03em', fontWeight: '600' }],
				regular: ['clamp(0.87rem, 3vw, 0.87rem)', { lineHeight: '1.25rem', letterSpacing: '0.025em', fontWeight: '400' }],

				// New typography for resume/document PDF export
				'doc-h1': ['clamp(1rem, 3vw, 1.3rem)', { lineHeight: '1.75rem', letterSpacing: '0.04em', fontWeight: '700' }],
				'doc-h2': ['clamp(0.85rem, 3vw, 1rem)', { lineHeight: '1.75rem', letterSpacing: '0.03em', fontWeight: '600' }],
				'doc-label': ['clamp(0.7rem, 3vw, 0.9rem)', { lineHeight: '1.2rem', letterSpacing: '0.03em', fontWeight: '600' }],
				'doc-regular': ['clamp(0.65rem, 3vw, 0.85rem)', { lineHeight: '1.15rem', letterSpacing: '0.027em', fontWeight: '400' }],
			},
			gridTemplateColumns: {
				'16': 'repeat(16, minmax(0, 1fr))',
				'20': 'repeat(20, minmax(0, 1fr))',
				'32': 'repeat(32, minmax(0, 1fr))',
			},
			gridColumn: {
				'span-13': 'span 13 / span 13',
				'span-14': 'span 14 / span 14',
				'span-16': 'span 16 / span 16',
				'span-25': 'span 25 / span 25',
			},
			animation: {
				pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				fadeIn: "fadeIn 0.5s ease-in forwards",
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},

			keyframes: {
				pulse: { '0%, 100%': { opacity: '1', backgroundColor: '#eeeeee', borderRadius: '4px' }, '50%': { opacity: '0.5', backgroundColor: '#eeeeee', borderRadius: '4px' } },
				fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" }, },
				'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
				'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } }

			}
		}
	},
	plugins: [
	]
} satisfies Config;