module.exports = {
  plugins: [
    require('autoprefixer')({
      grid: true
    }),
    require('css-mqpacker'),
    require('cssnano')({
      preset: [
        'default', {
          discardComments: {
            removeAll: true,
          }
        }
      ]
    })
  ]
}