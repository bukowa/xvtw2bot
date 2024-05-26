<script>
import JsonViewer from "vue-json-viewer";
import {mapState, mapGetters} from "vuex";

export default {
  components: {
    JsonViewer,
  },
  computed: {
    ...mapState([
      'villages',
    ]),
    villlageCount: ()=>{
      return this.villages.length
    },
  },
}

</script>

<template>
  <div>
  </div>
<!--  <json-viewer-->
<!--      :value="villages"-->
<!--      :expand-depth=1-->
<!--      copyable-->
<!--      boxed-->
<!--      sort>-->
<!--  </json-viewer>-->

</template>

<style scoped>

</style>