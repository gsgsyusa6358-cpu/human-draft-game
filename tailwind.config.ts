import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      boxShadow: {
        card: "0 14px 35px rgba(31, 41, 55, 0.10)"
      },
      colors: {
        ink: "#151827",
        paper: "#f7f8fb"
      }
    }
  },
  plugins: []
};

export default config;
