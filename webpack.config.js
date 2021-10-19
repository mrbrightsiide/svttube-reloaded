const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
    entry: "./src/client/js/main.js",
    mode: "development",
    watch: true,
    output:{
        filename: "js/main.js",
        path: path.resolve(__dirname, "assets"),
        clean:true
        // 새로운 output폴더를 빌드하면, 기존에 있던 사용하지 않게되는 output폴더를 지워주는 속성.
    },
    plugins: [new MiniCssExtractPlugin({
        filename:"css/styles.css"
    })],
    // 그냥코드문법임. 문서만 따라가도 됨
    module: {
        rules: [
            {
                test:/\.js$/,
                use:{
                    loader: "babel-loader",
                    options: {
                        presets: [['@babel/preset-env', { targets: "defaults" }]]
                    },
                },
            },
        {
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        ],
    },
};