"use strict";module.exports = {
  purge: {
    enabled: true,
    content: ["./src/**/*.{js,jsx,ts,tsx,vue}"],
  },
  theme: {
    extend: {
      colors: {
        primary: "var(--zmp-primary-color)",
        divider: "#E9EBED",
        background: "#ffffff",
        skeleton: "rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Add this line
  ],
};
 /* v7-8fb5d031e6e12a5d */