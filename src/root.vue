<template>
  <div id="iris-ba">
    <h1>Hello World ! {{version}}</h1>
    <div>
      <input type="text" v-model="componentName">
      <hr>
      <textarea v-model="template" style="width:100%" rows="10"></textarea>
      <hr>
      <textarea readonly v-model="patchedTemplate" style="width:100%" rows="10"></textarea>
      <hr>
      <h2>{{componentName}}</h2>
      <component :is="componentNameToUse"></component>
      <hr>
      I:{{iris.version}}<br>
    </div>
  </div>
</template>

<script>

  import rewriteTemplate from './templating/rewrite'

  export default {
    data() {
      return {
        version: IRIS_BA_VERSION,
        componentName: 'rs-control_abc_1_0',
        template: '<div rs-fullscreen rs-model="" rs-bind:field="dsd" ><test as="some"></test></div>',
        patchedTemplate: ''
      }
    },
    computed: {
      componentNameToUse(){
        var regEx = /^[A-Za-z0-9_\-]+$/

        if ( regEx.test(this.componentName) )
          return this.componentName
        else
          return ''
      }
      // hash() {
      //   return md5(this.template)
      // }
    },
    watch: {
      template(newTemplate) {
        this.patchedTemplate = rewriteTemplate(newTemplate)
      }
    }
  }

  
</script>

<style>
</style>
