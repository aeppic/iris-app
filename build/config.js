const path = require('path')
const flow = require('rollup-plugin-flow-no-whitespace')
const buble = require('rollup-plugin-buble')
const replace = require('rollup-plugin-replace')
const alias = require('rollup-plugin-alias')
const cleanup = require('rollup-plugin-cleanup')
const vue = require('rollup-plugin-vue')
const nodeResolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const nodeBuiltins = require('rollup-plugin-node-builtins')
const nodeGlobals = require('rollup-plugin-node-globals')

// const npm = require('rollup-plugin-npm')
// console.log(npm)

const version = process.env.VERSION || require('../package.json').version

const banner =
  '/**\n' + 
  ' * @license Commercial\n' +
  ' * \n' +
  ' * ira v' + version + '\n' +
  ' * (c) 2016-' + new Date().getFullYear() + ' curasystems GmbH\n' +
  ' * \n' +
  ' * License AGPL 3.0\n' +
  ' * \n' +
  ' * In order to remove the restrictions of the AGPL a commercial\n' +
  ' * license must be obtained from curasystems GmbH\n' +
  ' * \n' +
  ' * See https://github.com/ira/ira/blob/master/LICENSE\n' +
  ' */'

const builds = {
  // Main build CommonJS build (CommonJS)
  'web': {
    entry: path.resolve(__dirname, '../src/index.js'),
    dest: path.resolve(__dirname, '../dist/ira.js'),
    format: 'umd',
    env: 'development',
    banner,
  },
  'web-prod': {
    entry: path.resolve(__dirname, '../src/index.js'),
    dest: path.resolve(__dirname, '../dist/ira.min.js'),
    format: 'umd',
    env: 'production',
    banner
  },
  // Main build CommonJS build (CommonJS)
  'web-full-cjs': {
    entry: path.resolve(__dirname, '../src/index.js'),
    dest: path.resolve(__dirname, '../dist/ira.common.js'),
    format: 'cjs',
    env: 'development',
    banner
  },
  'web-full-cjs-prod': {
    entry: path.resolve(__dirname, '../src/index.js'),
    dest: path.resolve(__dirname, '../dist/ira.common.min.js'),
    format: 'cjs',
    env: 'production',
    banner
  },
  'web-test': {
    // entry: path.resolve(__dirname, '../src/index.js'),
    // dest: path.resolve(__dirname, '../dist/ira.webtest.js'),
    format: 'iife',
    sourceMap: 'inline',
    env: 'development'
  }
  // 'no_dom-full-cjs': {
  //   entry: path.resolve(__dirname, '../src/index.js'),
  //   dest: path.resolve(__dirname, '../dist/ira.no_dom.common.js'),
  //   format: 'cjs',
  //   env: 'development',
  //   banner,
  //   dom: false
  // },
  // 'no_dom-full-cjs-prod': {
  //   entry: path.resolve(__dirname, '../src/index.js'),
  //   dest: path.resolve(__dirname, '../dist/ira.no_dom.common.min.js'),
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
      nodeResolve({ jsnext: true, main: true, browser:true, preferBuiltins:true }),
      commonjs({ include: 'node_modules/**' }),
      nodeGlobals(),
      // nodeBuiltins(),
      alias(Object.assign({}, ...aliases)),
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
    'HAS_DOM': opts.dom===false ? false:true,
    'loadjs=': 'window.loadjs='
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
  exports.getAllBuilds = () => {
    var destinationBuilds = {}
    Object.keys(builds).forEach( (buildName)=>{
      var build = builds[buildName]
      if(build.dest){
        destinationBuilds[buildName] = build
      }
    })
    return Object.keys(destinationBuilds).map(name => genConfig(builds[name]))
  }
}
