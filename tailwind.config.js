/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
};

module.exports = {
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "cyberpunk",
      {
        cyberdark: {
          ...require("daisyui/src/theming/themes")["synthwave"],
          "color-scheme": "dark",
          "fontFamily":
            "ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace",
          "--rounded-box": "0",
          "--rounded-btn": "0",
          "--rounded-badge": "0",
          "--tab-radius": "0",
        },
      },
    ],
  },
};
