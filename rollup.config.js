// rollup.config.js

const { nodeResolve } = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const { babel } = require('@rollup/plugin-babel')
const { minify } = require('rollup-plugin-esbuild')
const { default: dts } = require('rollup-plugin-dts')

const project = require('./package.json')
const year = new Date().getFullYear()

const env = process.env.NODE_ENV
const isEnvDevelopment = env === 'development'
const isEnvProduction = env === 'production'

const input = 'src/index.ts'
const extensions = ['.js', '.ts', '.json']
const banner = `/*! @license ${project.license} (c) ${year} ${project.author} */`

module.exports = [
  {
    input,
    output: {
      file: project.main,
      format: 'umd',
      name: project.name,
      banner: isEnvProduction && banner,
      sourcemap: isEnvDevelopment
    },
    plugins: [
      nodeResolve({
        extensions
      }),
      commonjs(),
      babel({
        babelHelpers: 'runtime',
        exclude: /node_modules/,
        extensions
      }),
      isEnvProduction && minify()
    ].filter(Boolean)
  },
  isEnvProduction && {
    input,
    output: {
      file: project.types,
      format: 'esm',
      banner
    },
    plugins: [dts()]
  }
].filter(Boolean)
