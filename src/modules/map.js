const socketService = injector.get('socketService');
const routeProvider = injector.get('routeProvider');
const modelDataService = injector.get('modelDataService');

let x;

let myX = modelDataService.getSelectedVillage().data.x
let myY = modelDataService.getSelectedVillage().data.y
let charID = modelDataService.getSelectedCharacter().data.character_id

// sleep
let maxX = Math.max(...x.map((v)=>v.x))
let minX = Math.min(...x.map((v)=>v.x))
let maxY = Math.max(...x.map((v)=>v.y))
let minY = Math.min(...x.map((v)=>v.y))


const socketService = injector.get('socketService');
const routeProvider = injector.get('routeProvider');
const modelDataService = injector.get('modelDataService');
let charID = modelDataService.getSelectedCharacter().data.character_id


let getUniqueMapLocs = (x) => x.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.x === value.x && t.y === value.y
        ))
)

function requestCell(x, y, charID) {
    return new Promise((resolve, reject) => {
        socketService.emit(routeProvider.MAP_GETVILLAGES, {
            'x': x,
            'y': y,
            'width': 50,
            'height': 50,
            'character_id': charID,
        }, (response) => {
            if (response) {
                console.log(response);
                resolve(response['villages']);
            } else {
                reject('Request failed');
            }
        });
    });
}
async function coverMap(mapWidth, mapHeight, charID) {
    const step = 50;
    const delay = 100;  // Delay in milliseconds between requests
    const allVillages = [];
    const numRequestsX = Math.ceil(mapWidth / step);
    const numRequestsY = Math.ceil(mapHeight / step);

    const promises = [];

    for (let i = 0; i < numRequestsX; i++) {
        for (let j = 0; j < numRequestsY; j++) {
            const x = i * step;
            const y = j * step;

            // Create a promise for the request with a delay
            const promise = new Promise((resolve) => {
                setTimeout(async () => {
                    try {
                        const villages = await requestCell(x, y, charID);
                        allVillages.push(...villages);
                        resolve();
                    } catch (error) {
                        console.error('Error:', error);
                        resolve();  // Resolve even if there is an error to continue processing
                    }
                }, (i * numRequestsY + j) * delay);
            });

            promises.push(promise);
        }
    }

    // Wait for all promises to complete
    await Promise.all(promises);

    console.log('All data received:', allVillages);
}

// Example usage:
const mapWidth = 1000;  // Example map width
const mapHeight = 1000; // Example map height
console.log(getUniqueMapLocs(coverMap(mapWidth, mapHeight, charID)))
