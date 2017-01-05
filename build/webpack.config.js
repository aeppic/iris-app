const path = require('path') 
const vueConfig = require('./vue-loader.config')

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'iris-ba.js',
    jsonpFunction: 'irisbaJsonp'
  },
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: ['*', '.webpack.js', '.web.js', '.vue', '.ts', '.tsx', '.js'],
    alias: {
      'vue$': 'vue/dist/vue.common.js', // We need the compiler so override 
      // 'es6-promise': 'es6-promise/dist/es6-promise.auto.min.js',
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig
      },
      {
        test: /\.js$/,
        loader: 'buble-loader',
        exclude: /(node_modules|dist)/,
        options: {
          objectAssign: 'Object.assign',
          transforms: { dangerousForOf: true,modules: false  },
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  }
}