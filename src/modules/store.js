import {createStore} from 'vuex'
import {$rootScope, EventTypeProvider, ModelService, RouteProvider, SocketService} from "./services";

const emit = (route, payload, f) => {
    SocketService.emit(route, payload, (data) => {
        f(data)
    });
};

const emitWithPromise = (route, payload = {}) => {
    return new Promise((resolve, reject) => {
        SocketService.emit(route, payload, (data) => {
            try {
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    });
};

const fetchDataAsync = async (route, payload, process) => {
    try {
        const data = await emitWithPromise(route, payload);
        return process(data);
    } catch (error) {
        throw error;
    }
};

const runInterval = (f, t) => {f();setInterval(f, t)};

let getUniqueMapLocs = (x) => x.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.x === value.x && t.y === value.y
        ))
)

// Create a new store instance.
export function newStore(debug=true) {
    let log = (s) => console.log("Store: " + s);
    let withLog = (s, f) => {
        return () => {
            debug ? log(s): null
            return f()
        }
    }
    let store = createStore({
        state() {
            return {
                count: 0,
                villages: [],
                quests: {},
                mapDataLoadInitialized: false,
            }
        },
        mutations: {
            updateVillages(state, data) {
                if (data.length === 0) {
                    return
                }
                data = state.villages.concat(data)
                state.villages = getUniqueMapLocs(data);
            },
            updateQuests(state, data) {
                state.quests = data;
            }
        },
    })

    $rootScope.$on(EventTypeProvider.QUESTS_QUEST_LINES, async function (e, d){
        console.log('QUESTS_QUEST_LINES')
        store.commit('updateQuests', d)
    })

    $rootScope.$on(EventTypeProvider.QUESTS_QUEST_LINE_STARTED, async function (d){
        console.log('QUESTS_QUEST_LINE_STARTED' + d)
        // console.log('quester')
        // let quests = await fetchDataAsync(RouteProvider.QUESTS_GET_QUEST_LINES, {}, (data) => {
        //     log("Get quests..." + data);
        //     return data;
        // });
    })
    $rootScope.$on(EventTypeProvider.QUESTS_QUEST_PROGRESS, async function (d){
        console.log('QUESTS_QUEST_PROGRESS' + d)
        // console.log('quester')
        // let quests = await fetchDataAsync(RouteProvider.QUESTS_GET_QUEST_LINES, {}, (data) => {
        //     log("Get quests..." + data);
        //     return data;
        // });
    })
    $rootScope.$on(EventTypeProvider.QUESTS_QUEST_FINISHED, async function (d){
        // console.log('quester')
        // let quests = await fetchDataAsync(RouteProvider.QUESTS_GET_QUEST_LINES, {}, (data) => {
        //     log("Get quests..." + data);
        //     return data;
        // });
    })

    $rootScope.$on(EventTypeProvider.MAP_VILLAGE_DATA, function (e,d){
        console.log(EventTypeProvider.MAP_VILLAGE_DATA)
        console.log(d)
        store.commit('updateVillages', d['villages'])
    })

    $rootScope.$on('QuestsInterfaceControllerInitialized', function() {
        // Your code here, executed after the QuestsInterfaceController is initialized
        console.log('emmitting')
        SocketService.emit(RouteProvider.QUESTS_GET_QUEST_LINES)
    });

    // should return list of all villages on load?
    // is executed multiple times so should concat?
    $rootScope.$on("Map/miniVillageData", function (e, d){
        console.log("Map/miniVillageData")
        console.log(d)
        store.commit('updateVillages', d['villages'])
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