// babel.config.js

module.exports = api => {
  api && api.cache(true)
  const config = {
    presets: [
      [
        '@babel/preset-typescript',
        {
          allExtensions: true,
          isTSX: true
        }
      ],
      [
        '@babel/preset-env',
        {
          corejs: 3,
          useBuiltIns: 'usage'
        }
      ]
    ],
    plugins: ['@babel/plugin-transform-runtime']
  }
  return config
}
