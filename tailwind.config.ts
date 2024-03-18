import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        'specpurple': 'rgba(27, 1, 59)',
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        Fixture: ['FixtureUltra', 'sans'],
      },
    },
  },
  plugins: [],
} satisfies Config;
