<template>
  <component :is="layoutComponentName" :params="params"></component>
</template>

<script>
  import * as _ from 'lodash';
  // import irisDynamic from '../iris-dynamic';

  const DOCUMENT_ID_REGEX = /^[-0-9a-zA-Z\x7f-\xff-]+$/;
  const DOCUMENT_AS_NAME_REGEX = /^[_0-9a-zA-Z\x7f-\xff]+$/;

  export default function(lookup) {
    return {
      name: 'rsGet',
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
        return {
          layoutComponentName: null
        }
      },
      methods: {
      },
      watch: {
        layoutId: function(){
          // this.load()
        }
      },
      created() {
        this.load()
      },
      beforeMount() {
        this.layoutComponentName = lookup(this.layoutId)
      }
    }
  }
</script>

<style>
</style>