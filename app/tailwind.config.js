module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  mode: "jit",
  theme: {
    extend: {},
  },
  daisyui: {
    // themes: ["winter", "forest", "winter", "forest"],
  },
  plugins: [require("daisyui")],
};
