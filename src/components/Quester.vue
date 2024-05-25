<script>
import {RouteProvider, SocketService, ModelService} from "../modules/services";
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
  methods: {
    finishQuests: function() {
      console.log("finishing quests...")
      SocketService.emit(RouteProvider.QUESTS_GET_QUEST_LINES, {}, function(d){
        d['quest_lines'].forEach((q)=>{q.quests.forEach((q2)=>{q2.isFinishable() ? SocketService.emit(RouteProvider.QUEST_FINISH_QUEST, {
          'quest_id': q2.data['quest_id'],
          'village_id': ModelService.getSelectedVillage().getId()
        }) : null})});
      });
    },
    questFinisher: function () {
      setInterval(this.finishQuests, 20000)
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
  <button type="button" @click="questFinisher">RUN</button>
</template>

<style scoped>

</style>