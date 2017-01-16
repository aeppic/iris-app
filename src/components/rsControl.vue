<template>
  <component is="controlComponentId"></component>
</template>

<script>
export default {
  props: {
    /**
     * Name of control to lookup. It can contain a namespace (<ns>:<name>). It is used in
     * combination with the form of the document to render to look up the actual
     * control component.
     */
    name: {
      type: 'String',
      required: true 
    },
    document: {
      type: 'Object',
      required: true
    },
    fieldName: {
      type: 'String',
      required: true
    },
    params: {
      type: 'Object',
      required: false
    }
  },
  data() {
    return {
      controlComponentId: ''
    }
  },
  created(){

  },
  watch: {
    
  }
}
</script>
