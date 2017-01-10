import 'zepto'

export default function rewriteTemplate(template){
  const templateNode = document.createElement('div')
  templateNode.innerHTML = template
  
  injectScopedTemplateForAs(templateNode)
  renameRSAttributes(templateNode)

  return templateNode.innerHTML
}

function injectScopedTemplateForAs(templateNode){
  const asNodes = $('*[as]', templateNode)
  asNodes.each( (index,asNode)=>{
    const node = $(asNode)
    const as = node.attr('as')
    asNode.innerHTML = `<template scope='${as}'>${asNode.innerHTML}</template>`
  })
}

function renameRSAttributes(templateNode){
  const nodes = $('*', templateNode)
  const renames = []

  for(const node of nodes) {
    for(const attr of node.attributes) {
      if( isSpecificRsDirective(attr, 'rs-on rs-bind: rs-model'.split(' ')) ) {
        renames.push( [node,rewriteRs(attr)] )
      } else if( isRsAttribute(attr) ) {
        renames.push( [node,prefixWithAdditionalV(attr)] )
      }
    }
  }

  for(const rename of renames){
    const node = rename[0]
    const op = rename[1]

    const n = $(node)

    n.attr( op.new, op.attr.value )
    n.attr( op.attr.name, null )
  }
}

function isSpecificRsDirective(attr,names) {
  const name = attr.name.toLowerCase()
  for( let n of names ){
    if(name.indexOf(n) === 0)
      return true
  }
  return false
}

function rewriteRs(attr) {
  const suffix = attr.name.slice(3)
  const newName = `v-${suffix}`

  return { new:newName, attr }
}

function isRsAttribute(attr) {
  const name = attr.name.toLowerCase()
  return (name[0] === 'r' && name[1] === 's' && name[2] === '-')
}

function prefixWithAdditionalV(attr){
  const newName = `v-${attr.name}`
  return { new:newName, attr }
}
