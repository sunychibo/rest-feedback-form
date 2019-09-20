const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const prodWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  plugins: [ new CleanWebpackPlugin() ]
});

module.exports = new Promise((resolve, reject) => {
  resolve(prodWebpackConfig);
});