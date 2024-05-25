<template>
  <div>{{looted}} || {{lootedTime}} || {{ rate }}</div>
</template>

<script>
export default {
  data() {
    return {
      'looted': 0,
      'lootedTime': 0,
      'rate': 0,
    }
  },
  watch: {
    // looted() {},
    // lootedTime(){},
  },
  mounted() {
    this.looted = this.getLooted()
    this.lootedTime = Date.now()
    // window.setInterval(()=>{
    //   this.looted = this.getLooted()
    //   this.lootedTime = Date.now()
    // }, 2000)
  },
  methods: {
    getLooted: function() {
      return window.injector.get("achievementListService").getAchievementsData()['achievements']['loot']['progress']
    },
    calcRate: function(nowLooted, lastLooted, lastTime){
      // todo calc last session because can't divide 0
      return (nowLooted - lastLooted) / (Math.abs(Date.now() - new Date(lastTime)) / 36e5)
    }
  }
}
</script>