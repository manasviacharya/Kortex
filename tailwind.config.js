export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#14B8A6",
        ai: "#8B5CF6",
        background: "#F8FAFC",
        panel: "#FFFFFF",
        border: "#E2E8F0",
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
        'ai-gradient': 'linear-gradient(to right, #4F46E5, #8B5CF6)',
        'intelligence-gradient': 'linear-gradient(to right, #14B8A6, #4F46E5)',
      }
    },
  },
  plugins: [],
}
