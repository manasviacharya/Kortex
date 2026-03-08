export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F48C71",
        secondary: "#112A46",
        ai: "#9AB8D4",
        background: "#FFFFFF",
        panel: "#FFFFFF",
        border: "#EAECEF",
        text: {
          primary: "#0F172A",
          secondary: "#475569",
          muted: "#94A3B8",
        },
        status: {
          success: "#22C55E",
          warning: "#F59E0B",
          error: "#EF4444",
        }
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'ai-gradient': 'linear-gradient(to right, #F48C71, #F48C71)',
        'intelligence-gradient': 'linear-gradient(to right, #9AB8D4, #9AB8D4)',
      }
    },
  },
  plugins: [],
}
