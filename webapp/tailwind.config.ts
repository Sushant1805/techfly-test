import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'brand-blue': '#0052FF',
        'brand-blue-light': '#337AFF',
        'brand-blue-gradient-start': '#0f62fe',
        'brand-blue-gradient-end': '#4589ff',
        'bg-soft': '#F0F4F9',
        'slate-soft': '#F8FAFC',
        'text-slate': '#1E293B',
      },
      boxShadow: {
        'soft': '0 10px 40px -10px rgba(0, 50, 150, 0.08)',
        'soft-lg': '0 20px 50px -10px rgba(0, 50, 150, 0.12)',
        'glow': '0 0 20px rgba(0, 82, 255, 0.4)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      }
    },
  },
  plugins: [],
};
export default config;
