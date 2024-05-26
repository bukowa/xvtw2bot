const socketService = injector.get('socketService');
const routeProvider = injector.get('routeProvider');
const modelDataService = injector.get('modelDataService');

let myX = modelDataService.getSelectedVillage().data.x
let myY = modelDataService.getSelectedVillage().data.y
let charID = modelDataService.getSelectedCharacter().data.character_id


getVisibleGridCells = function getVisibleGridCells() {
    var cells = [],
        cell;

    for (var gridX = 0; gridX < grid.length; gridX++) {
        for (var gridY = 0; gridY < grid[gridX].length; gridY++) {
            cell = grid[gridX][gridY];

            if (Math.abs(dX) + minimapWidth <= cell.x || Math.abs(dY) + minimapHeight <= cell.y
                || Math.abs(dX) >= cell.x + cell.width || Math.abs(dY) >= cell.y + cell.height)
                continue;

            cells.push(cell);
        }
    }

    return cells;
}

socketService.emit(routeProvider.MAP_GET_MINIMAP_VILLAGES, {
    'x': 500,
    'y': 500,
    'width': 1000,
    'height': 1000,
}, (d)=>{console.log(d)})

let getUniqueMapLocs = (x) => x.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.x === value.x && t.y === value.y
        ))
)

async function coverMap(charID) {
    try {
        const boundingCoords = await getBoundingCoordinates(charID);
        const { minX, maxX, minY, maxY } = boundingCoords;
        const step = 50;
        const delay = 100;  // Delay in milliseconds between requests
        const allVillages = [];
        const numRequestsX = Math.ceil((maxX - minX + 1) / step);
        const numRequestsY = Math.ceil((maxY - minY + 1) / step);

        const promises = [];

        for (let i = 0; i < numRequestsX; i++) {
            for (let j = 0; j < numRequestsY; j++) {
                const x = minX + (i * step);
                const y = minY + (j * step);

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
    } catch (error) {
        console.error('Error:', error);
    }
}

// Example usage:
(async () => {
    const charID = 12345;  // Example character ID
    await coverMap(charID);
})();