<script>
import {mapState} from "vuex";

export default {
  name: 'Loader',
  components: {
  },
  computed: {
    ...mapState([
        'progressMapLoad',
        'progressTownLoad'
    ]),
    progressMap() {
      return (this.progressMapLoad['current'] / this.progressMapLoad['total']) * 100
    },
    progressTown() {
      return (this.progressTownLoad['current'] / this.progressTownLoad['total']) * 100
    },
  }
}
</script>

<template>
  Map data load: {{progressMap}}
  Town data load: {{progressTown}}
</template>

<style scoped>

</style>