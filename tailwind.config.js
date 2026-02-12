// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        "bounce-slow": "bounce 4s ease-in-out infinite",
        "bounce-slow-delay": "bounce 4s ease-in-out 1.2s infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
