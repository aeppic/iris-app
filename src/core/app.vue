<template>
  <div id="iris-ba">
    <h1>Hello World ! {{version}}</h1>
    <div>
      <input type="text" v-model="componentName">
      <component :is="componentName"></component>
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
        componentName: '',
        localstate: this.state
      }
    },
    // computed: {
    //   iris(){}
    // }
  }
</script>

<style>
</style>
