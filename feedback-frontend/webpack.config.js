const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack')
const env =
  process.env.NODE_ENV === 'production'
    ? new webpack.EnvironmentPlugin({ ...process.env })
    : new Dotenv()

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ],
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
    }),
    env,
  ],
};
