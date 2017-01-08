<template>
  <component :is="layoutComponentName" :params="params"></component>
</template>

<script>
  // import irisDynamic from '../iris-dynamic';

  const DOCUMENT_ID_REGEX = /^[-0-9a-zA-Z\x7f-\xff-]+$/;
  const DOCUMENT_AS_NAME_REGEX = /^[_0-9a-zA-Z\x7f-\xff]+$/;

  export default {
    name: 'rsLayout',
    props: {
      "layoutId": {
        type: String,
        default: null,
        validator: function(value) {
          if (!value || value.length === 0 || value.trim().length === 0)
            return false

          return DOCUMENT_ID_REGEX.test(value.trim())
        }
      },
      "params": {
        type: Object,
        required: false
      }
    },
    data: function() {
      debugger;
      console.log('rsLayout', this.layoutId)
      return {
        layoutComponentName: null
      }
    },
    methods: {
      load(){
        debugger;
        
      }
    },
    watch: {
      layoutId: function(){
        this.load()
      }
    },
    created() {
      this.load()
    },
    beforeMount() {
      this.layoutComponentName = lookup(this.layoutId)
    }
  }
</script>

<style>
</style>
