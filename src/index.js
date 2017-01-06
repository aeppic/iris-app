import rsLayoutFactory from './components/rsLayout.vue'

class Iris {
  constructor(options){
    console.log('yeah')
  }

  _registerComponents(vue,deps){
    vue.component(rsLayoutFactory)
  } 
}

export default Iris