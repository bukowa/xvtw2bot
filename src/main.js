import { createApp } from 'vue'
import App from './App.vue'
import {ModelService, Init, $rootScope, EventTypeProvider} from "./modules/services";
import {newStore} from "./modules/store"
import {mapService} from "./define/mapdata";
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css'
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
        app.use(PrimeVue)
        console.log("Mounting #app...")
        app.mount('#app')
        return {app: app, store: store};
    })
    mapService(window)
    require([
        'my/app',
        'my/mapService'
    ], function (
        app,
        mapService,
    ){

        // load map data after it's first loaded by the game
        let mapDataLoading = false;
        $rootScope.$on(EventTypeProvider.MAP_VILLAGE_DATA, function (e,d){
            if (!mapDataLoading) {
                mapDataLoading = true
                mapService.loadMap((c, i, g, d) =>{
                    app.store.commit("setMapLoad", {
                        total: g.length,
                        current: i+1,
                    })
                    if (d['villages'].length > 0) {
                        app.store.commit("updateVillages", d['villages'])
                    }
                }, 1000)
            }
        })

        $rootScope.$on(EventTypeProvider.MAP_DATA_LOADED_SUCCESS, ()=>{
            mapService.loadTowns({
                minX: app.store.getters.villageMinX,
                minY: app.store.getters.villageMinY,
                maxX: app.store.getters.villageMaxX,
                maxY: app.store.getters.villageMaxY,
            }, (xy, i, XY, d)=>{
                app.store.commit("setTownLoad", {
                    total: XY.length,
                    current: i+1,
                })
                if (d['villages']) {
                    app.store.commit('updateVillages', d['villages'])
                }
            }, 1000);
        })
    })
})