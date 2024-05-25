<script>
import JsonViewer from "vue-json-viewer";

export default {
  components: {
    JsonViewer,
  },
  computed: {
    villages() {
      return this.$store.state.villages
    }
  }
}

</script>

<template>
  <div>
    Hello! {{ count }}
  </div>
  <json-viewer
      :value="villages"
      :expand-depth=1
      copyable
      boxed
      sort>
  </json-viewer>

</template>

<style scoped>

</style>