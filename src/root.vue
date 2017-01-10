<template>
  <div id="iris-ba">
    <h1>Hello World ! {{version}}</h1>
    <div>
      <input type="text" v-model="componentName">
      <hr>
      <h2>{{componentName}}</h2>
      <component :is="componentNameToUse"></component>
      <hr>
      I:{{iris.version}}<br>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        version: IRIS_BA_VERSION,
        componentName: 'rs-control_abc_1_0',
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
    }
  }
</script>

<style>
</style>
