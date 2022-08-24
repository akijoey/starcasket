// rollup.config.js

const { nodeResolve: resolve } = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const { babel } = require('@rollup/plugin-babel')
const { minify } = require('rollup-plugin-esbuild')

const project = require('./package.json')
const year = new Date().getFullYear()

const env = process.env.NODE_ENV
const isEnvDevelopment = env === 'development'
const isEnvProduction = env === 'production'

module.exports = {
  input: 'src/index.ts',
  output: {
    file: project.main,
    format: 'umd',
    name: project.name,
    banner:
      isEnvProduction &&
      `/*! @license ${project.license} (c) ${year} ${project.author} */`,
    sourcemap: isEnvDevelopment
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({ babelHelpers: 'runtime' }),
    isEnvProduction && minify()
  ].filter(Boolean)
}
