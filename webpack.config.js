const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './src', './style/style.less'],
  output: {
    path: __dirname + 'dist',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [{
        exclude: /node_modules/,
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-1'],
          plugins: ['transform-decorators-legacy']
        }
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  plugins: [
    new HtmlPlugin({title: 'simple form', template: 'index.ejs', inject: true}),
	  new ExtractTextPlugin('style.css')
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: './dist',
    port: 3000
  }
};
