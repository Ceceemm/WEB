/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        forge: {
          black: "hsl(36 13% 8%)",
          dark: "hsl(38 12% 16%)",
          mid: "hsl(34 8% 33%)",
          light: "hsl(34 8% 54%)",
          orange: "hsl(18 76% 48%)",
          "orange-glow": "hsl(18 70% 38%)",
          gold: "hsl(43 56% 48%)",
          gray: "hsl(32 7% 46%)",
          cream: "hsl(42 31% 92%)",
          white: "hsl(40 24% 97%)",
          // Light sections
          paper: "hsl(42 25% 92%)",
          surface: "hsl(38 26% 97%)",
          "warm-border": "hsl(34 14% 78%)",
          "warm-text": "hsl(36 15% 11%)",
          "warm-muted": "hsl(34 8% 38%)",
        },
      },
      fontFamily: {
        display: ['"Noto Serif SC"', '"Source Han Serif SC"', '"SimSun"', 'Georgia', 'serif'],
        body: ['"Noto Sans SC"', '"Source Han Sans SC"', '"PingFang SC"', '"Microsoft YaHei"', '"Helvetica Neue"', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Source Code Pro"', '"Consolas"', '"Courier New"', 'monospace'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        forge: "0 0 30px rgba(224, 90, 61, 0.15)",
        "forge-lg": "0 0 60px rgba(224, 90, 61, 0.25)",
        "forge-inner": "inset 0 0 30px rgba(224, 90, 61, 0.08)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "forge-glow": {
          from: {
            boxShadow: "0 0 20px rgba(224, 90, 61, 0.2), 0 0 60px rgba(224, 90, 61, 0.1)",
          },
          to: {
            boxShadow: "0 0 40px rgba(224, 90, 61, 0.35), 0 0 100px rgba(224, 90, 61, 0.2)",
          },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-right": {
          from: { opacity: "0", transform: "translateX(-40px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "slide-left": {
          from: { opacity: "0", transform: "translateX(40px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "heat-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 0 0 rgba(224, 90, 61, 0.4)",
          },
          "50%": {
            boxShadow: "0 0 0 8px rgba(224, 90, 61, 0)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "forge-glow": "forge-glow 2s ease-in-out infinite alternate",
        "slide-up": "slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-right": "slide-right 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-left": "slide-left 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 1s ease forwards",
        "heat-pulse": "heat-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
