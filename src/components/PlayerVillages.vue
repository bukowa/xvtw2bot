<script setup>

import {usePlayerVillagesStore} from "../store/PlayerVillages";

const store = usePlayerVillagesStore();
const modelDataService = window.injector.get('modelDataService');
const getVillages = () => modelDataService.getVillages();

function updateVillages() {
  console.log("updateVillages");
  store.villages = getVillages();
}

updateVillages();
</script>

<template>
  <div>
    <h1>Player Villages</h1>
    <div v-for="village in store.villages" :key="village.data.villageId">
      <p>{{village.data.villageId}}:{{village.data.name}}</p>
    </div>
  </div>
  <button @click="updateVillages">Update villages</button>
</template>

<style scoped>

</style>