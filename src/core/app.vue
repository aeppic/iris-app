<template>
  <div id="iris-ba">
    <h1>Hello World ! {{version}}</h1>
    <div>
      <input type="text" v-model="componentName">
      <hr>
      <h2>{{componentName}}</h2>
      <component :is="componentNameToUse"></component>
      <hr>
      I:{{iris}}<br>
      S:{{state}}<br>
      LS:{{localstate}}
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        version: IRIS_BA_VERSION,
        componentName: 'rs-control_abc_1_0',
        localstate: this.state
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
