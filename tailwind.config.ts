/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
};

module.exports = {
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        cyberligth: {
          ...require("daisyui/src/theming/themes")["retro"],
          "color-scheme": "light",
          "fontFamily":
            "ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace",
          "--rounded-box": "0",
          "--rounded-btn": "0",
          "--rounded-badge": "0",
          "--tab-radius": "0",
        }
      },
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
