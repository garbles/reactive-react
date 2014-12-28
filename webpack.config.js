var webpack = require('webpack');

module.exports = {
  entry: './src/index.coffee',
  output: {
    path: __dirname,
    filename: './index.js'
  },
  module: {
    loaders: [
      { test: /\.coffee$/, loader: 'coffee-loader' },
    ]
  },
  plugins: [
    // new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.UglifyJsPlugin(),
    // new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.optimize.AggressiveMergingPlugin()
  ],
  resolve: {
    extensions: ["", ".coffee", ".js"]
  }
};
