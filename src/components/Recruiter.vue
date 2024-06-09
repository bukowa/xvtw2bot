<script setup>
import {useRecruiterStore} from "../store/Recruiter";

const store = useRecruiterStore();
const recruitService = injector.get('recruitingService');

const recruitBarracks = (unit, amount) => {
  // select active village first
  recruitService.recruit("barracks", unit, amount);
}

// start recruiting each 1 minute
const startRecruiting = () => {
  console.log("Start recruiting");
  recruitBarracks(store.unitType, store.unitAmount)
  store.interval = setInterval(() => {
    console.log("Recruiting");
    recruitBarracks(store.unitType, store.unitAmount);
    store.info ++;
  }, store.time * 1000);
}

// stop recruiting
const stopRecruiting = () => {
  if (store.interval !== 0) {
    clearInterval(store.interval);
    store.interval = 0;
  } else {
    console.log("No interval to clear");
  }
}

</script>

<template>
  // unit type input
  <input type="text" v-model="store.unitType" placeholder="Unit type">
  <br>
  // amount input
  <input type="number" v-model="store.unitAmount" placeholder="Amount">
  <br>
  // time input
  <input type="number" v-model="store.time" placeholder="Time">
  // info
  <p>{{store.info}}</p>
  <br>
  <button @click="startRecruiting">Start recruiting</button>
  <button @click="stopRecruiting">Stop recruiting</button>
</template>

<style scoped>

</style>