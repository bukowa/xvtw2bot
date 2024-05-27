<script>
import ProgressBar from 'primevue/progressbar';
import {mapState} from "vuex";

export default {
  name: 'Loader',
  components: {
    ProgressBar
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
    progressTowns() {
      return (this.progress)
    }
  }
}
</script>

<template>
  Map data load:
  <ProgressBar :value="progressMap"></ProgressBar>
  Town data load:
  <ProgressBar :value="progressTown"></ProgressBar>
</template>

<style scoped>

</style>