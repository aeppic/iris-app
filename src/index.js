import Vue from 'vue'
import App from './core/app.vue'

import State from './state'

class Iris {

  constructor(options) {
    this._rootId = 'iris-ba'
    this._options = options

    var state = this._state = new State()

    this._pageApp = new Vue(Vue.util.extend({
      // state,
      // router,
      // store,
      computed: {
        iris() { return state }
      }
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
