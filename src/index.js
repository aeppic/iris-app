import Vue from 'vue'
import App from './core/app.vue'

import State from './state'

class Iris {

  constructor(options) {
    this._rootId = 'iris-ba'
    this._options = options

    const state = this._state = new State()

    const irisCommonComponentMixin = {
      computed: {
        iris() { return state }
      }
    }

    this._pageApp = new Vue(Vue.util.extend({
      // state,
      // router,
      mixins: [irisCommonComponentMixin]
    }, App))

    if (options.components)
      this._state.registerComponents(options.components, Vue)

    if (this._options.el) {
      this._rootElement = document.querySelector(this._options.el)
      this._pageApp.$mount(this._rootElement)
    }
  }

  static _registerComponents(vue) {
    vue.component(rsLayoutFactory)
  }

  mount(){
    return this._pageApp.$mount('#iris-ba')
  }

  get $vuePageApp() {
    return this._pageApp;
  }
}
 
export default Iris
