const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./app/index.jsx",
  output: { path: __dirname, filename: "dist/bundle.js" },

  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["es2015", "@babel/react"],
          },
        },
      },
    ],
  },
};
