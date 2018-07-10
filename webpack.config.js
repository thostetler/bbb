const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const prod = 'production';
const dev = 'development';

// determine build env
const TARGET_ENV = process.env.NODE_ENV;
const isDev = TARGET_ENV === dev;
const isProd = TARGET_ENV === prod;

const entryPath = path.resolve(__dirname, './src/static/index.js');
const outputPath = path.resolve(__dirname, './dist');
const outputFilename = isProd ? '[name]-bundle-[hash].js' : '[name]-bundle.js'

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
    })
  ]
};

if (isDev) {
  module.exports = merge(commonConfig, {
    mode: 'development'
  });
}

if (isProd) {
  module.exports = merge(commonConfig, {
    mode: 'production'
  });
}
