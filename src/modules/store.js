import {createStore} from 'vuex'
import {ModelService, RouteProvider, SocketService} from "./services";

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

// Create a new store instance.
export async function newStore(debug=true) {
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
                villages: null,
                quests: null
            }
        },
        mutations: {
            updateVillages(state, data) {
                state.villages = data;
            },
            updateQuests(state, data) {
                state.quests = data;
            }
        },
    })

    let quests = await fetchDataAsync(RouteProvider.QUESTS_GET_QUEST_LINES, {}, (data) => {
        log("Get quests...");
        return data;
    });
    store.commit('updateQuests', quests)

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