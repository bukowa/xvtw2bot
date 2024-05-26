import { createApp } from 'vue'
import App from './App.vue'
import {ModelService, Init, $rootScope, EventTypeProvider} from "./modules/services";
import {newStore} from "./modules/store"
import {mapData} from "./define/mapdata";

(function awaitInjector (window, main) {
    if (typeof window.injector === 'undefined') {
        setTimeout(() => awaitInjector(window, main), 250);
    }
    else {
        main(window);
    }
})(typeof unsafeWindow !== 'undefined' ? unsafeWindow : window, function (window, undefined) {
    console.log('Injector is ready...')
    const define = window.define;
    const require = window.require;
    console.log(define)
    Init()

    define('my/app', [
        'struct/MapData',
    ], function (mapData) {
        console.log("Creating new store...")
        let store = newStore()
        console.log("Creating new app...")
        let app = createApp(App)
        app.use(store)
        console.log("Mounting #app...")
        app.mount('#app')
        return app;
    })
    mapData(window)
    require([
        'my/app',
        'my/mapData'
    ], function (
        app,
        mapData,
    ){

        // load map data after it's first loaded by the game
        let mapDataInitialized = false;
        let mapDataLoading = false;
        $rootScope.$on(EventTypeProvider.MAP_VILLAGE_DATA, function (e,d){
            if (mapDataLoading || !mapDataInitialized) {
                mapDataLoading = true
                mapData.load((c, i, g) =>{console.log(c, i)})
                mapDataInitialized = true;
            }
        })
    })
})