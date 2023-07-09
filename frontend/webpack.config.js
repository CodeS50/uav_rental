const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const dotenv = require('dotenv');
const webpack = require('webpack');

module.exports = (_, argv) => {
  const isDevelopment = argv.mode === 'development';

  const envFilePath = './.env';
  const env = dotenv.config({ path: envFilePath }).parsed;

  const config = {
    devtool: !isDevelopment ? 'source-map' : 'inline-source-map',
    stats: 'errors-warnings',
    entry: {
      app: './src/index.jsx',
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      // publicPath: (process.env.VERSION==='dev'?'/':'./'),
      filename: '[name].[chunkhash].js',
      sourceMapFilename: '[name].[chunkhash].map',
      chunkFilename: '[id].[chunkhash].js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Panel',
        template: path.join(__dirname, 'public', 'index.html'),
        // favicon: './public/favicon.ico',
        publicPath: env.PANEL_URL,
      }),
      new ESLintPlugin({
        extensions: ['js', 'jsx'],
        fix: false,
        emitError: true,
        emitWarning: true,
        failOnError: true,
        failOnWarning: false,
      }),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(env),
      }),
    ],
    devServer: {
      static: {
        directory: path.resolve(__dirname, 'public'),
      },
      port: env.PORT,
      hot: true,
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
      },
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins: [
                // this code will evaluate to "false" when
                // "isDevelopment" is "false"
                // otherwise it will return the plugin
                // eslint-disable-next-line global-require
                isDevelopment && require('react-refresh/babel'),
                // this line removes falsy values from the array
              ].filter(Boolean),
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
        {
          test: /\.svg$/,
          loader: 'svg-url-loader',
        },
        {
          test: /\.(png|jpe?g|gif|jpg)$/i,
          // use: ['url-loader', 'file-loader'],
          type: 'asset/resource',
        },
      ],
    },
    // pass all js files through Babel
    resolve: {
      extensions: ['*', '.js', '.jsx'],
    },
  };

  if (isDevelopment) {
    // https://dev.to/workingeeks/speeding-up-your-development-with-webpack-5-hmr-and-react-fast-refresh-of8
    config.plugins.push(new ReactRefreshWebpackPlugin());
  }

  return config;
};
