module.exports = {
  entry: './src/client.js',
  output: {
    path: './static',
    filename: 'bundle.js'
  },
  externals: {
    director: 'window'
  }
}
