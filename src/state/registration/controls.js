export default function registerControls(state, controls, vue) {
  for(const control of controls){
    const document = control.__document

    const name = `rs-control_${document.id}_${document.v}_0`
    vue.component(name, control)

    registerControl(state,document,name)
  }
}

function registerControl(state,document,componentName) {
  let ns = state.controls[document.data.namespace]

  if (!ns)  
    ns = state.controls[document.data.namespace] = {}

  ns[document.data.name] = componentName
}
