<script>
  import * as _ from 'lodash';
  // import irisDynamic from '../iris-dynamic';

  const DOCUMENT_ID_REGEX = /^[-0-9a-zA-Z\x7f-\xff-]+$/;
  const DOCUMENT_AS_NAME_REGEX = /^[_0-9a-zA-Z\x7f-\xff]+$/;

  export default {
    name: 'rsGet',
    props: {
      "documentId": {
        type: String,
        default: null,
        required: true,
        validator: function(value) {
           if (!value || value.length === 0 || value.trim().length === 0)
            return false

          return DOCUMENT_ID_REGEX.test(value.trim())
        }
      },
      "as": {
        type: String,
        required: true,
        validator: function(value) {
           if (!value || value.length === 0 || value.trim().length === 0)
            return false

          return DOCUMENT_AS_NAME_REGEX.test(value.trim())
        }
      }
    },
    data: function() {
      return { loadedDocument:{}, loading:false }
    },
    methods: {
      load: function() {
        // return;
        setTimeout(()=>{
          // find it
          const documentIdToFind = this.documentId
          this.loadedDocument = { id:documentIdToFind, data: {name:`found it ('${documentIdToFind}' => '${this.as}')`} }
        },100)
        this.loading = true
      },
    },
    watch: {
      documentId: function(){
        this.load()
      }
    },
    created() {
      this.load()
    },
    render: function(createElement) {
      return createElement('div', {class:'rs-get'},this.$scopedSlots.default( this.loadedDocument ) )
    },
    // render: function(createElement) {
    //   // console.log('render',this)
    //   // debugger;
    //   // return;
    //   // return createElement('div', [
    //   //   this.$scopedSlots.default({
    //   //     myScopedVariable: ''
    //   //   })
    //   // ])

    //   // const f = this.$scopedSlots.default;
    //   // <template>
    //   //   <div>
    //   //     <!--<div :document-id="document ? document.id:''" :title="document ? document.data.name :''"></div>-->
    //   //     Document: {{document}}
    //   //     <slot :param="document">
    //   //       This is the default content of the rs-get component
    //   //     </slot>
    //   //   </div>
    //   // </template>
    //   // let slots = [];

      // slots.push(  this.$scopedSlots.default({hello:'123'})[0] );
    //   const slotParams = {
    //     title:'test'
    //   };
    //   slotParams[this.as] = this.loadedDocument;
        
    //   // return createElement( 'div',
    //   //   [
    //   //     createElement( 'slot', slotParams, this.$slots.default )
    //   //   ]); 
    //   return createElement('div', [
    //     createElement('child', {
    //       // pass scopedSlots in the data object
    //       // in the form of { name: props => VNode | Array<VNode> }
    //       scopedSlots: {
    //         default: function (props) {
    //           return createElement('span', props.text)
    //         }
    //       }
    //     })
    //   ])
    // },

    // on the server, only fetch the item itself
    // preFetch: fetchItem,
    // on the client, fetch everything
    beforeMount() {
      //this.designComponentName = irisDynamic.getComponentNameForDesign();
      // this.designComponentName = createDocumentDesign(this.name, new Date().toString());
    }
  }
</script>

<style>

</style>