const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const BASE_JS = "./src/client/js/";

module.exports = {
  entry: {
    main: BASE_JS + "main.js",
    videoplayer: BASE_JS + "videoPlayer.js",
    recorder: BASE_JS + "recorder.js",
    commentSection: BASE_JS + "commentSection.js",
    closeAd: BASE_JS + "closeAd.js",
    videoCategory: BASE_JS + "videoCategory.js",
  },
  mode: "development",
  watch: true,
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "assets"),
    // clean: true,
    // 새로운 output폴더를 빌드하면, 기존에 있던 사용하지 않게되는 output폴더를 지워주는 속성.
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpg|png|gif)$/i,
        use: "file-loader",
      },
    ],
  },
};
