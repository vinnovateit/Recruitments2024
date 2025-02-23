import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        'specpurple': 'rgba(27, 1, 59)',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        }
      },
      animation: {
        slideIn: 'slideIn 0.3s ease-out forwards',
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        Fixture: ['FixtureUltra', 'sans'],
      },
    },
  },
  plugins: [],
} satisfies Config;
