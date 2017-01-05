import Vue from 'vue'
import rsLayoutFactory from './components/rsLayout.vue'

export function registerComponents(vue,deps){
  vue.component(rsLayoutFactory)
}