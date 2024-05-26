const socketService = injector.get('socketService');
const routeProvider = injector.get('routeProvider');
const modelDataService = injector.get('modelDataService');

let myX = modelDataService.getSelectedVillage().data.x
let myY = modelDataService.getSelectedVillage().data.y
let charID = modelDataService.getSelectedCharacter().data.character_id


socketService.emit(routeProvider.MAP_GET_MINIMAP_VILLAGES, {
    "x": 310,
    "y": 296,
    "width": 306,
    "height": 306,
    "loaded": true
}, function (d){console.log(d)})
