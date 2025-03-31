module.exports = {
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
};
