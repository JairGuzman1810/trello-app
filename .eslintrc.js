// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: [
    "expo",
    "eslint:recommended",
    "plugin:import/typescript",
    "plugin:import/errors",
    "plugin:import/warnings",
  ],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};
