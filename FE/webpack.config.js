const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
entry: "./src/app.js",
output: {
  path: path.resolve(__dirname, 'dist'),
  filename: 'bundle.js',
},
devServer: {
  historyApiFallback: true,
},
module: {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
      }
    },
    {
      test: /\.css$/,
      use: [
        {loader: 'style-loader'}, 
        {loader: 'css-loader'}
      ],
    },
  ]
},
plugins: [new HtmlWebPackPlugin({ template: "./public/index.html" })]
};