import {defineStore} from "pinia";


export const usePlayerVillagesStore = defineStore('playerVillages', {
    state: () => ({
        villages: [],
    }),
});