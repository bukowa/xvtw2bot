import {createStore} from 'vuex'
import {$rootScope, EventTypeProvider, RouteProvider, SocketService} from "./services";
import {Villages} from "../utils/village";

export function newStore() {
    let store = createStore({
        state() {
            return {
                path: "/",
                villages: [],
                towns: [],
                quests: {},
                progressMapLoad: {
                    current: 0,
                    total: 0,
                },
                progressTownLoad: {
                    current: 0,
                    total: 0,
                }
            }
        },
        getters: {
            villageCount(state){
                return state.villages.length
            },
            villageMinX(state) {
                return Math.min(...state.villages.map((v)=>v.x))
            },
            villageMaxX(state) {
                return Math.max(...state.villages.map((v)=>v.x))
            },
            villageMinY(state){
                return Math.min(...state.villages.map((v)=>v.y))
            },
            villageMaxY(state){
                return Math.max(...state.villages.map((v)=>v.y))
            },
            townCount(state){
                return state.towns.length
            }
        },
        mutations: {
            setPath(state, data){
                state.path = data
            },
            updateVillages(state, data) {
                state.villages = Villages.unique(state.villages.concat(data))
            },
            updateTowns(state, data) {
                state.towns = Villages.unique(state.towns.concat(data))
            },
            updateQuests(state, data) {
                state.quests = data;
            },
            setMapLoad(state, data) {
                state.progressMapLoad = data
            },
            setTownLoad(state, data){
                state.progressTownLoad = data
            }
        },
    })

    $rootScope.$on(EventTypeProvider.QUESTS_QUEST_LINES, async function (e, d) {
        console.log('QUESTS_QUEST_LINES')
        store.commit('updateQuests', d)
    })

    $rootScope.$on(EventTypeProvider.QUESTS_QUEST_LINE_STARTED, async function (d) {
        console.log('QUESTS_QUEST_LINE_STARTED' + d)
        // console.log('quester')
        // let quests = await fetchDataAsync(RouteProvider.QUESTS_GET_QUEST_LINES, {}, (data) => {
        //     log("Get quests..." + data);
        //     return data;
        // });
    })
    $rootScope.$on(EventTypeProvider.QUESTS_QUEST_PROGRESS, async function (d) {
        console.log('QUESTS_QUEST_PROGRESS' + d)
        // console.log('quester')
        // let quests = await fetchDataAsync(RouteProvider.QUESTS_GET_QUEST_LINES, {}, (data) => {
        //     log("Get quests..." + data);
        //     return data;
        // });
    })
    $rootScope.$on(EventTypeProvider.QUESTS_QUEST_FINISHED, async function (d) {
        // console.log('quester')
        // let quests = await fetchDataAsync(RouteProvider.QUESTS_GET_QUEST_LINES, {}, (data) => {
        //     log("Get quests..." + data);
        //     return data;
        // });
    })

    $rootScope.$on(EventTypeProvider.MAP_VILLAGE_DATA, function (e, d) {
    })

    // should return list of all villages on load?
    // is executed multiple times so should concat?
    $rootScope.$on("Map/miniVillageData", function (e, d) {
        // console.log("Map/miniVillageData")
        // console.log(d)
    })

    // setInterval(()=>{emit(RouteProvider.QUESTS_GET_QUEST_LINES, {}, (d)=>{
    //     log("Get quests...")
    //     store.commit('updateQuests', d)
    // })}, 5000)
    //
    // runInterval(withLog(
    //     "Get villages...",
    //     ()=>{store.commit('updateVillages', ModelService.getVillages())}
    // ), 5000)
    return store;
}