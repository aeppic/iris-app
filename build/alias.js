const path = require('path')

const isProd = process.env.NODE_ENV === 'production' 
const vueVersion = isProd ? 'vue.common.min.js' : 'vue.common.js'

module.exports = {
  'vue': path.resolve(__dirname, `../node_modules/vue/dist/${vueVersion}`),
  'loadjs': path.resolve(__dirname, `../node_modules/loadjs/dist/loadjs.min.js`)
  // 'zepto': path.resolve(__dirname, `../libs/zepto.js`)
}
