/* eslint-disable no-console */

const Iris = require('../..')

const rewrittenTemplate = Iris.rewriteTemplate('<div rs-fullscreen rs-model="" rs-bind:field="dsd" rs-test="test"><test as="some">some content</test></div>')
console.log(rewrittenTemplate)
