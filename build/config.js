const path = require('path')
const flow = require('rollup-plugin-flow-no-whitespace')
const buble = require('rollup-plugin-buble')
const replace = require('rollup-plugin-replace')
const alias = require('rollup-plugin-alias')
const vue = require('rollup-plugin-vue')
const nodeResolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')

const version = process.env.VERSION || require('../package.json').version

const banner =
  '/*!\n' +
  ' * iris-ba.js v' + version + '\n' +
  ' * (c) 2016-' + new Date().getFullYear() + ' curasystems GmbH\n' +
  ' * Commercial License..\n' +
  ' */'

const builds = {
  // Main build CommonJS build (CommonJS)
  'web-full-cjs': {
    entry: path.resolve(__dirname, '../src/index.js'),
    dest: path.resolve(__dirname, '../dist/iris-ba.js'),
    format: 'cjs',
    env: 'development',
    alias: { he: './entity-decoder' },
    banner
  },
  'web-full-cjs-prod': {
    entry: path.resolve(__dirname, '../src/index.js'),
    dest: path.resolve(__dirname, '../dist/iris-ba.min.js'),
    format: 'cjs',
    env: 'production',
    banner
  },
}

function genConfig (opts) {
  const config = {
    entry: opts.entry,
    dest: opts.dest,
    external: opts.external,
    format: opts.format,
    banner: opts.banner,
    moduleName: 'Vue',
    plugins: [
      nodeResolve({ jsnext: true, main: true }),
      // commonjs({ include: 'node_modules/**' }),
      vue(),
      flow(),
      buble(),
      alias(Object.assign({}, require('./alias'), opts.alias))
    ]
  }

  if (opts.env) {
    config.plugins.push(replace({
      'process.env.NODE_ENV': JSON.stringify(opts.env)
    }))
  }

  return config
}

if (process.env.TARGET) {
  module.exports = genConfig(builds[process.env.TARGET])
} else {
  exports.getBuild = name => genConfig(builds[name])
  exports.getAllBuilds = () => Object.keys(builds).map(name => genConfig(builds[name]))
}
