const path = require('path')

module.exports = {
  outputDir: path.resolve(__dirname, '../shinWalletBuild/public'),
  pwa: {
    iconPaths: {
      favicon32: 'img/favicon.ico',
    }
  }
};