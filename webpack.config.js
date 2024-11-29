const path = require('path');

module.exports = {
  mode: 'development',
  entry: './public/js/main.js',
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: 'main.bundle.js'
  },
  module: {
    rules: [
      {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
}
};