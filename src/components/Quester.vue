<script>
import {RouteProvider, SocketService} from "../modules/services";
import JsonViewer from "vue-json-viewer";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Quester",
  components: {
    JsonViewer,
  },
  computed: {
    quests() {
      return this.$store.state.quests
    }
  },
}
</script>

<template>
  <div>
    Hello World!
    <json-viewer
        :value="quests"
        :expand-depth=1
        copyable
        boxed
        sort></json-viewer>
  </div>
</template>

<style scoped>

</style>