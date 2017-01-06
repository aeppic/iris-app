import rsLayoutFactory from './components/rsLayout.vue'

class Iris {
  // constructor() {
  //   //console.log('yeah')
  // }

  static _registerComponents(vue) {
    vue.component(rsLayoutFactory)
  }
}

export default Iris
