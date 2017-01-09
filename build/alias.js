const path = require('path')

const isProd = process.env.NODE_ENV === 'production' 
const vueVersion = isProd ? 'vue.common.min.js' : 'vue.common.js'

module.exports = {
    'vue': path.resolve(__dirname, `../node_modules/vue/dist/${vueVersion}`)
}
