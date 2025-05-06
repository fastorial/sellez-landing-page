/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,jsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", "system-ui", "sans-serif"],
			},
			colors: {
				primary: {
					50: "#EFF6FF",
					100: "#DBEAFE",
					200: "#BFDBFE",
					300: "#93C5FD",
					400: "#60A5FA",
					500: "#3B82F6",
					600: "#2563EB",
					700: "#1D4ED8",
					800: "#1E40AF",
					900: "#1E3A8A",
				},
				secondary: {
					50: "#EFFCF6",
					100: "#CCFBEF",
					200: "#99F6E4",
					300: "#5EEAD4",
					400: "#2DD4BF",
					500: "#14B8A6",
					600: "#0D9488",
					700: "#0F766E",
					800: "#115E59",
					900: "#134E4A",
				},
				accent: {
					50: "#F5F3FF",
					100: "#EDE9FE",
					200: "#DDD6FE",
					300: "#C4B5FD",
					400: "#A78BFA",
					500: "#8B5CF6",
					600: "#7C3AED",
					700: "#6D28D9",
					800: "#5B21B6",
					900: "#4C1D95",
				},
				success: {
					50: "#F0FDF4",
					500: "#22C55E",
					700: "#15803D",
				},
				warning: {
					50: "#FFFBEB",
					500: "#F59E0B",
					700: "#B45309",
				},
				error: {
					50: "#FEF2F2",
					500: "#EF4444",
					700: "#B91C1C",
				},
			},
			boxShadow: {
				soft: "0 2px 15px rgba(0, 0, 0, 0.05)",
				medium: "0 4px 20px rgba(0, 0, 0, 0.08)",
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: 0, transform: "translateY(10px)" },
					"100%": { opacity: 1, transform: "translateY(0)" },
				},
			},
			animation: {
				fadeIn: "fadeIn 0.5s ease-out",
			},
		},
	},
	plugins: [],
};
