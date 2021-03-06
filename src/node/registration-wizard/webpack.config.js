var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
  //context: path.join(__dirname, "jsx"),
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./jsx/index.js",
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
        }
      }
    ]
  },
  output: {
    //path: __dirname + '/src/js/',
    path: '../../jekyll/js/',
    filename: 'subscription.bundle.js',
    publicPath: '/js/'
  },
  plugins: debug ? [] : [
    new webpack.optimize.UglifyJsPlugin(),
  ],
};