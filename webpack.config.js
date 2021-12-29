const path = require('path');

// See: https://webpack.js.org/guides/author-libraries/

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    globalObject: 'this',
    library: 'googleCloudEdgeLocations',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'umd'),
    filename: 'googlecloud-edge-locations.min.js'
  }
};
