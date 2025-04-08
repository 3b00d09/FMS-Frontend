import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				background: '#050914',
				primary: '#9DB0F6',
				secondary: '#7A2385',
				text: '#EAEAEA',
				accent: '#F7ABE5',
				placeholderText: '#808287',
				formBg: '#0C1838',
				linkHover: '9DB0F6'
			},
			fontFamily: {
				playfair: ['"Playfair Display"', 'serif']
			}
		}
	},

	plugins: [typography]
} satisfies Config;
