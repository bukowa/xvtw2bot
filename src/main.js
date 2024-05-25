import { createApp } from 'vue'
import App from './App.vue'
import {ModelService, Init} from "./modules/services";
import {newStore} from "./modules/store"

(async function awaitInjector () {
    if (typeof window.injector === 'undefined' || window.injector.get('modelDataService').getVillages() === null) {
        console.log("waiting")
        setTimeout(() => awaitInjector(), 250);
    }
    else {
        let v = window.injector.get("modelDataService").getVillages()
        let k = Object.keys(v);
        if (v[k[0]]['initialized'] === false) {
            console.log('false')
            setTimeout(() => awaitInjector(), 250);
            return
        }
        Init()
        console.log("!@#!@################################\n!@############\n!@#######################\n!@################")
        console.log(ModelService.getVillages())
        console.log("ready")

        let app = createApp(App)
        let store= await newStore();
        app.use(store)
        // app.use(JsonViewer)
        app.mount('#app')

    }
})()

