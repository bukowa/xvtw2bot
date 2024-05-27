<script>
import JsonViewer from "vue-json-viewer";
import {mapState, mapGetters} from "vuex";

export default {
  name: "Villages",
  components: {
    JsonViewer,
  },
  computed: {
    ...mapState([
      'villages',
    ]),
    ...mapGetters([
        'villageMaxX',
        "villageMinX",
        "villageMaxY",
        "villageMinY",
        "villageCount"
    ]),
  },
}

</script>

<template>
  <div>
    count: {{villageCount}}
    maxx: {{villageMaxX}}
    maxy: {{villageMaxY}}
    miny: {{villageMinY}}
    minx: {{villageMinX}}
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