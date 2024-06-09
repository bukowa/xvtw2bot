import {defineStore} from "pinia";

//calculateMaxRecruitable
export const useRecruiterStore = defineStore('recruiter', {
    state: () => ({
        "unitType": "axe",
        "unitAmount": 1,
        "time": 1000,
        "interval": 0,
        "info":0,
    }),
})