<script>
import {RouteProvider, SocketService} from "../modules/services";
import JsonViewer from "vue-json-viewer";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Quester",
  components: {
    JsonViewer,
  },
  data() {
    return {
      'quests': {},
    }
  },
  mounted() {
    this.updateQuests();
    window.setInterval(() => {
      this.updateQuests()
    }, 30000)
  },
  methods: {
    updateQuests: function () {
      const vm = this;
      SocketService.emit(
          RouteProvider.QUESTS_GET_QUEST_LINES, {}, function (d) {
            console.log(d)
            vm.quests = d;
          }
      )
    }
  }
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