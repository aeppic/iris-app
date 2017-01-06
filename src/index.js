import Vue from 'vue'


import { App } from './core'
import rsLayoutFactory from './components/rsLayout.vue'


class Iris {

  constructor(options) {
    this._options = options

    this._pageApp = new Vue(Vue.util.extend({
      // router,
      // store
    }, App))


    if (this._options.el) {
      this._rootElement = document.querySelector(this._options.el)

      this._pageApp.$mount(this._rootElement)
    }
  }

  static _registerComponents(vue) {
    vue.component(rsLayoutFactory)
  }
}

export default Iris
