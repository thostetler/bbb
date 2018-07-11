const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const prod = 'production';
const dev = 'development';

// determine build env
const TARGET_ENV = process.env.NODE_ENV;
const isDev = TARGET_ENV === dev;
const isProd = TARGET_ENV === prod;

const entryPath = path.resolve(__dirname, './src/static/index.js');
const outputPath = path.resolve(__dirname, './dist');
const outputFilename = isProd ? '[name]-bundle-[hash].js' : '[name]-bundle.js';

console.log('[webpack] building for: ', TARGET_ENV);

const commonConfig = {
  entry: entryPath,
  output: {
    path: outputPath,
    filename: outputFilename
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader'
      }
    }]
  },
  resolve: {
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat'
    }
  },
  devServer: {
    port: 8000,
    compress: true,
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './dist'),
    proxy: {
      '/v1': 'https://devapi.adsabs.harvard.edu'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './src/static/template.html'),
      minify: true
    }),
    new CleanWebpackPlugin([path.resolve(__dirname, './dist')]),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
};

if (isDev) {
  module.exports = merge(commonConfig, {
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            'style-loader',
            'css-loader', {
              loader: 'postcss-loader', options: {
                plugins: () => [require('autoprefixer')]
              }
            },
            'sass-loader',
          ],
        }
      ]
    }
  });
}

if (isProd) {
  module.exports = merge(commonConfig, {
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader', {
              loader: 'postcss-loader', options: {
                plugins: () => [require('autoprefixer')]
              }
            },'sass-loader',
          ],
        }
      ]
    }
  });
}
