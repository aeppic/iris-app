import registerControls from './registration/controls'

class State {
  constructor(){
    this.controls = {}
  }

  registerComponents(components, vue){
    registerControls(this, components.controls, vue)
  }
}

export default State 
