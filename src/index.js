import Vue from 'vue'
import Root from './root.vue'

import Store from './store'

import registerControls from './registration/controls'
import registerForms from './registration/forms'

import rewriteTemplate from './templating/rewrite'

import 'loadjs'
import Minibus from  'minibus'

import defaultsDeep from 'lodash-es/defaultsDeep.js'

const DEFAULT_OPTIONS = {
  components: {
    controls: [],
    forms: []
  }
}

class Iris {

  constructor(options) {
  
    this.version = IRIS_BA_VERSION

    this.controls = {}
    this.forms = {}

    this._options = defaultsDeep({},options||{},DEFAULT_OPTIONS)

    this._store = this._options.store || new Store()
    
    exposePropertiesFromObject(this, this._store, 'get,getHistoricDocument,watch,search,subscribe,query')

    const ui = (this._options.components || this._options.el || this._options.ui)

    if (ui) {
      initUI(this)
    }

    this._bus = Minibus.create()
  }

  static rewriteTemplate(...args) {
    return rewriteTemplate(...args)
  }

  mount() {
    if (!this._rootComponent)
      throw new Error('UI is not initialized. Run constructor with appropriate arguments')

    return this._rootComponent.$mount(`#${this._rootId}`)
  }

  get $vuePageApp() {
    return this._rootComponent
  }

}

/* eslint-disable no-param-reassign  */
function exposePropertiesFromObject(iris, object, properties) {
  const propertyNames = properties.split(',')

  for (const propertyName of propertyNames) {
    Object.defineProperty(iris, propertyName, {
      get: function getter() {
        return object[propertyName]
      }
    })
  }
}

function initUI(iris) {

  iris._rootId = 'iris-ba'

  const irisCommonComponentMixin = {
    computed: {
      iris() { return iris },
    },
  }

  iris._rootComponent = new Vue(Vue.util.extend({
    // state,
    // router,
    mixins: [irisCommonComponentMixin],
  }, Root))

  if (iris._options.components) {
    registerComponents(iris, iris._options.components, Vue)
  }

  if (iris._options.el) {
    iris._rootElement = document.querySelector(iris._options.el)
    iris._rootComponent.$mount(iris._rootElement)
  }
}

function registerComponents(iris, components, vue) {
  
  if (!components) {
    return
  }

  if (components.controls) {
    registerControls(iris, components.controls, vue)
  }

  if (components.forms) {
    registerForms(iris, components.forms, vue)
  }
}

/* eslint-enable  */

export default Iris
