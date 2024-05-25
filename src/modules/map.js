const socketService = injector.get('socketService');
const routeProvider = injector.get('routeProvider');
const modelDataService = injector.get('modelDataService');

let x;

let myX = modelDataService.getSelectedVillage().data.x
let myY = modelDataService.getSelectedVillage().data.y

socketService.emit(routeProvider.MAP_GETVILLAGES, {
    'x': myX,
    'y': myY,
    'width': 50,
    'height': 50
}, (d)=>{console.log(d);x=d['villages']});

// sleep
let maxX = Math.max(...x.map((v)=>v.x))
let minX = Math.min(...x.map((v)=>v.x))
let maxY = Math.max(...x.map((v)=>v.y))
let minY = Math.min(...x.map((v)=>v.y))

socketService.emit(routeProvider.MAP_GETVILLAGES, {
    'x': myX - 49,
    'y': myY -49,
    'width': 50,
    'height': 50
}, (d)=>{console.log(d);x=x.concat(d['villages'])});

socketService.emit(routeProvider.MAP_GETVILLAGES, {
    'x': myX - 49,
    'y': myY + 49,
    'width': 50,
    'height': 50
}, (d)=>{console.log(d);x=x.concat(d['villages'])});


socketService.emit(routeProvider.MAP_GETVILLAGES, {
    'x': myX + 49,
    'y': myY + 49,
    'width': 50,
    'height': 50
}, (d)=>{console.log(d);x=x.concat(d['villages'])});

socketService.emit(routeProvider.MAP_GETVILLAGES, {
    'x': myX + 49,
    'y': myY - 49,
    'width': 50,
    'height': 50
}, (d)=>{console.log(d);x=x.concat(d['villages'])});

const uniqueMapLocs = x.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.x === value.x && t.y === value.y
        ))
);