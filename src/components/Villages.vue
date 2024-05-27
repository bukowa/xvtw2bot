<script>
import JsonViewer from "vue-json-viewer";
import {mapState, mapGetters} from "vuex";

export default {
  name: "Villages",
  data() {
    return {
      columns: [
        'affiliation',
        'id'
      ]
    }
  },
  components: {
    JsonViewer,
  },
  computed: {
    ...mapState([
      'villages',
      'towns'
    ]),
    ...mapGetters([
      'villageMaxX',
      "villageMinX",
      "villageMaxY",
      "villageMinY",
      "villageCount",
      "townCount"
    ]),
  },
}

</script>

<template>
  <div>
    village count: {{ villageCount }}
    town count: {{ townCount }}
    maxx: {{ villageMaxX }}
    maxy: {{ villageMaxY }}
    miny: {{ villageMinY }}
    minx: {{ villageMinX }}
  </div>


  <json-viewer
      :value="villages"
      :expand-depth=1
      copyable
      boxed
      sort>
  </json-viewer>

  <json-viewer
      :value="towns"
      :expand-depth=1
      copyable
      boxed
      sort>
  </json-viewer>

</template>

<style scoped>

</style>