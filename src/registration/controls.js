export default function registerControls(state, controls, vue) {
  for (const control of controls){
    const document = control.__document

    const name = `rs-control_${document.id}_${document.v}_0`
    vue.component(name, control)

    registerControl(state, document, name)
  }
}

function registerControl(state, document, componentName) {
  let controlNamespace = document.data.namespace || ''
  
  if (document.data.namespace.trim() === '') {
    controlNamespace = '__default'
  }

  let ns = state.controls[controlNamespace]

  if (!ns) { 
    ns = state.controls[controlNamespace] = {} // eslint-disable-line no-param-reassign
  }

  ns[document.data.name] = componentName
}
