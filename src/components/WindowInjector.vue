
<template>
 <div>
   <json-viewer
       :value="villages"
       :expand-depth=1
       copyable
       boxed
       sort></json-viewer>
 </div>
</template>

<script>

import JsonViewer from "vue-json-viewer";


export default {
  name: 'WindowInjector',
  components: {
    JsonViewer,
  },
  data() {
    return {
      "villages": {},
    }
  },
  props: {
    msg: String
  },
  mounted() {
    this.villages = window.injector.get('modelDataService').getVillages()
    console.log(this.villages)
  }
}
</script>
