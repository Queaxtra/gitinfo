import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        backgroundDark: "#f4f4f4"
      }
    }
  },

  plugins: []
} as Config;
