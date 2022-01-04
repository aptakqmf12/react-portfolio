const path = require("path");
const webpackRefresh = require("@pmmmwh/react-refresh-webpack-plugin");
const { webpack } = require("webpack");

module.exports = {
  name: "boilerplate",
  mode: "development",
  devtool: "eval",
  resolve: {
    extensions: [".js", ".jsx"],
  },
  // 입력
  entry: {
    app: [path.resolve(__dirname, "./src/index.js")],
  },
  // 룰 -> loaders라고함
  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  browsers: ["> 0.1% in KR", "last 2 chrome versions"], //browserlist 사이트 참고
                },
                // useBuiltIns: "usage",
                // corejs: 3,
                // modules: false,
                debug: true,
              },
            ],
            "@babel/preset-react",
          ],
          plugins: [
            "@babel/plugin-proposal-class-properties",
            "react-refresh/babel",
            "@babel/plugin-transform-runtime",
          ],
          sourceType: "unambiguous",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  // 웹팩기능 외의 추가작업
  plugins: [
    new webpackRefresh(), // 핫로더 사용
  ],
  //출력
  output: {
    path: path.join(__dirname, "dist"),
    filename: "app.js",
    publicPath: "/dist",
  },
  devServer: {
    //핫로더 서버
    // devMiddleware: { publicPath: "/dist" },
    // static: { directory: path.resolve(__dirname, "./index.js") },
    hot: true,
    historyApiFallback: true,
  },
};
