import {createStore} from 'vuex'
import {ModelService} from "./services";

// Create a new store instance.
export function newStore() {
    return createStore({
        state() {
            return {
                count: 0,
                villages: ModelService.getVillages()
            }
        },
        mutations: {
            increment(state) {
                state.count++
            }
        }
    })
}