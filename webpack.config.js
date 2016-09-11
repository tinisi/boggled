/* eslint-disable no-var */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var cssnext = require('postcss-cssnext');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var isProduction = (process.env.NODE_ENV === 'production');

var webpackConfig = {
  entry: [
    './src/resources/js/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app-[hash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js']
  },
  devtool: 'sourcemap',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
        inline: true,
        hot: true,
        inject: 'head',
        filename: 'index.html',
        template: 'src/index.html',
        outputPath: path.join(__dirname, 'dist')
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        },
        include: path.join(__dirname, 'src')
      },
      {
        loader: 'url?limit=10000&name=resources/img/[name].[hash].[ext]',
        include: path.join(__dirname, 'src/resources/img')
      },
      {
        test: /\.html$/,
        loader: "html-loader",
        include: path.join(__dirname, 'src')
      },
      {
        test:   /\.css$/,
        loaders: ['style-loader','css-loader','postcss-loader'],
        include: path.join(__dirname, 'src/resources/styles')
      }
    ]
  },
  devServer: {
    inject: 'head',
    historyApiFallback: true,
    entry: 'app',
    port: 5000
  },
  postcss: function () {
    return [cssnext];
  }
};

if ( isProduction ) {

  // add the compression in prod mode only
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      include: /\.js$/,
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      }
    })
  );

  // clean the dist...
  webpackConfig.plugins.push(
    new CleanWebpackPlugin([__dirname + '/dist'], {
      root: process.cwd()
    })
  );

};

module.exports = webpackConfig;