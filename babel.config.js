module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
        },
      ],
      [
        "module-resolver",
        {
          alias: {
            "@": "./",
            "@components": "./componentes", // usa './app' si tu carpeta principal se llama 'app'
          },
        },
      ],
    ],
  };
};
