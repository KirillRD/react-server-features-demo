const path = require("path")
const ReactServerDomWebpackPlugin = require("react-server-dom-webpack/plugin")

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src", "client", "index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true
  },
  plugins: [
    new ReactServerDomWebpackPlugin({
      isServer: false
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  }
}
