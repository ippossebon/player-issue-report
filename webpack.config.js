const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist',
    filename: 'player-issue-report.js',
    library: 'PlayerIssueReport',
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader' },
      { test:/\.css$/, loader:'style-loader!css-loader' },
      { test: /\.(gif|png)/, loader: 'file-loader' },
    ]
  },
  devServer: {
    host: '0.0.0.0',
    port: '8082',
    contentBase: 'public/',
    disableHostCheck: true
  }
}
