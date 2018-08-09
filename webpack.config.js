var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  module: {
    loaders: [
      {
        test: /src\/.+.js$/,
        loader: 'babel',
        query: {
          compact: true,
        }
      },
      {
        test: /\.scss$/,
        loaders: ['css', "sass"]
      },
      {
        test: /\.html$/, loader: 'html?minimize=true'
      }
    ],
  },
  resolve: {
    extensions: ['', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'clappr-videos-offer-end-screen.js',
    library: 'ClapprVideosOfferEndScreen',
    libraryTarget: 'umd',
  },
  plugins: [
  new webpack.optimize.UglifyJsPlugin({
    output: {comments: false}
  }),
  new webpack.ContextReplacementPlugin(
      /moment[\/\\]locale$/, /pt-br/
  )],
  externals: {
    'moment': 'moment',
  }
};
