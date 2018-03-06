module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-cssnext': {
      features: {
        rem: false
      },
      browsers: ['last 2 versions', '> 1%', 'not ie <= 8']
    },
    'postcss-nested': {},
    'cssnano': {}
  }
}