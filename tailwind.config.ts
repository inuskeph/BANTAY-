import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: { extend: { colors: { bantay: { primary: '#2563eb', dark: '#0f172a', danger: '#dc2626', safe: '#16a34a', accent: '#7c3aed', warning: '#d97706' } }, fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'], display: ['Poppins', 'system-ui', 'sans-serif'] }, animation: { 'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite', 'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' } } },
  plugins: [],
};
export default config;
