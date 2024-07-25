module.exports = {
    module: {
      rules: [
        {
          test: /\.ts$/,
          enforce: "pre",
          use: ["source-map-loader"],
        },
      ],
    },
    ignoreWarnings: [/Failed to parse source map/],
  };