let jsdom

if (typeof window === 'undefined') {
  jsdom = require('jsdom').jsdom
  global.document = jsdom('<html><body></body></html>', { })
  global.window = document.defaultView
  global.getComputedStyle = global.window.getComputedStyle
}

const Iris = require('./dist/iris-ba.common.min.js')
module.exports = Iris
