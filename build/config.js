const path = require('path')
const flow = require('rollup-plugin-flow-no-whitespace')
const buble = require('rollup-plugin-buble')
const replace = require('rollup-plugin-replace')
const alias = require('rollup-plugin-alias')
const cleanup = require('rollup-plugin-cleanup')
const vue = require('rollup-plugin-vue')
const nodeResolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')

const version = process.env.VERSION || require('../package.json').version

const banner =
  '/*!\n' +
  ' * iris-ba v' + version + '\n' +
  ' * (c) 2016-' + new Date().getFullYear() + ' curasystems GmbH\n' +
  ' * Commercial License. \n' +
  ' * \n' +
  ' * This library must only be used within the context of code \n' +
  ' * demonstrations (JSFiddle, etc) or with express written consent\n' +
  ' * by curasystems GmbH.\n' +
  ' * \n' +
  ' * See https://github.com/iris-ba/iris-ba/blob/master/LICENSE\n' +
  ' */'

const builds = {
  // Main build CommonJS build (CommonJS)
  'web': {
    entry: path.resolve(__dirname, '../src/index.js'),
    dest: path.resolve(__dirname, '../dist/iris-ba.js'),
    format: 'umd',
    env: 'development',
    banner,
  },
  'web-prod': {
    entry: path.resolve(__dirname, '../src/index.js'),
    dest: path.resolve(__dirname, '../dist/iris-ba.min.js'),
    format: 'umd',
    env: 'production',
    banner
  },
  // Main build CommonJS build (CommonJS)
  'web-full-cjs': {
    entry: path.resolve(__dirname, '../src/index.js'),
    dest: path.resolve(__dirname, '../dist/iris-ba.common.js'),
    format: 'cjs',
    env: 'development',
    banner
  },
  'web-full-cjs-prod': {
    entry: path.resolve(__dirname, '../src/index.js'),
    dest: path.resolve(__dirname, '../dist/iris-ba.common.min.js'),
    format: 'cjs',
    env: 'production',
    banner
  },
  // 'no_dom-full-cjs': {
  //   entry: path.resolve(__dirname, '../src/index.js'),
  //   dest: path.resolve(__dirname, '../dist/iris-ba.no_dom.common.js'),
  //   format: 'cjs',
  //   env: 'development',
  //   banner,
  //   dom: false
  // },
  // 'no_dom-full-cjs-prod': {
  //   entry: path.resolve(__dirname, '../src/index.js'),
  //   dest: path.resolve(__dirname, '../dist/iris-ba.no_dom.common.min.js'),
  //   format: 'cjs',
  //   env: 'production',
  //   banner,
  //   dom: false
  // }
}

function genConfig (opts) {

  const aliases = [
    require('./alias'),
    opts.alias
  ]
 
  const config = {
    entry: opts.entry,
    dest: opts.dest,
    external:  opts.external,
    format: opts.format,
    banner: opts.banner,
    sourceMap: opts.sourceMap!=null ? opts.sourceMap : true,
    moduleName: 'Iris',
    plugins: [
      commonjs({ include: 'node_modules/**' }),
      alias(Object.assign({}, ...aliases)),
      nodeResolve({ jsnext: true, main: true, browser:true }),
      vue(),
      flow(),
      buble({
        transforms: { dangerousForOf: true }
      }),
      cleanup()
    ]
  }

  const replacements = {
    'IRIS_BA_VERSION': '"'+version+'"',
    'HAS_DOM': opts.dom===false ? false:true 
  }

  if (opts.env) {
    replacements['process.env.NODE_ENV'] = JSON.stringify(opts.env)
  }

  // if(opts.dom === false){
  //   // aliases.push(require('./no_dom-alias'))
  //   replacements['window'] = JSON.stringify({ document: {}, navigator: {} })
  //   replacements['document'] = JSON.stringify({ body: {} })
  //   replacements['getComputedStyle'] = '(function(){})'
  //   replacements['Zepto'] = '(function(){})'
  // }

  config.plugins.push(replace(replacements))

  return config
}

if (process.env.TARGET) {
  module.exports = genConfig(builds[process.env.TARGET])
} else {
  exports.getBuild = name => genConfig(builds[name])
  exports.getAllBuilds = () => Object.keys(builds).map(name => genConfig(builds[name]))
}
