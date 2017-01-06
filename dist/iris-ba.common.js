/*!
 * iris-ba v3.0.3
 * (c) 2016-2017 curasystems GmbH
 * Commercial License. 
 * 
 * This library must only be used within the context of code 
 * demonstrations (JSFiddle, etc) or with express written consent
 * by curasystems GmbH.
 * 
 * See https://github.com/iris-ba/iris-ba/blob/master/LICENSE
 */
'use strict';

var rsLayoutFactory = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.layoutComponentName,{tag:"component",attrs:{"params":_vm.params}})},staticRenderFns: [],
  // return {
  //   name: 'rsGet',
  //   props: {
  //     "layoutId": {
  //       type: String,
  //       default: null,
  //       validator: function(value) {
  //         if (!value || value.length === 0 || value.trim().length === 0)
  //           return false

  //         return DOCUMENT_ID_REGEX.test(value.trim())
  //       }
  //     },
  //     "params": {
  //       type: Object,
  //       required: false
  //     }
  //   },
  //   data: function() {
  //     return {
  //       layoutComponentName: null
  //     }
  //   },
  //   methods: {
  //   },
  //   watch: {
  //     layoutId: function(){
  //       // this.load()
  //     }
  //   },
  //   created() {
  //     this.load()
  //   },
  //   beforeMount() {
  //     this.layoutComponentName = lookup(this.layoutId)
  //   }
  // }
};

var Iris = function Iris(options){
  console.log('yeah');
};
Iris.prototype._registerComponents = function _registerComponents (vue,deps){
  vue.component(rsLayoutFactory);
};

module.exports = Iris;
