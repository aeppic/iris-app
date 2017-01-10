export default function registerForms(state, formComponents, vue) {
  for (const formComponent of formComponents) {
    const document = formComponent.__document

    const name = `rs-form_${document.id}_${document.v}_0`
    vue.component(name, formComponent)

    registerForm(state, document, name)
  }
}

export function registerForm(state, document) {
  const formId = document.id

  let formVersions = state.forms[formId]

  if (!formVersions) { 
    formVersions = state.forms[formId] = {} // eslint-disable-line no-param-reassign
  }

  formVersions[document.v] = document 
}
