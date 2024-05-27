import {$rootScope, EventTypeProvider, RouteProvider, SocketService} from "../modules/services"

export const getMinimapGrid = (size, width, height) => {
    const grid = [];
    const xChunks = Math.ceil(size / width);
    const yChunks = Math.ceil(size / height);

    for (let gridX = 0; gridX < xChunks; gridX++) {
        const chunkX = Math.min(width * gridX, size);
        const chunkWidth = Math.min(width, size - chunkX);

        const row = [];
        for (let gridY = 0; gridY < yChunks; gridY++) {
            const chunkY = Math.min(height * gridY, size);
            const chunkHeight = Math.min(height, size - chunkY);

            row.push({x: chunkX, y: chunkY, width: chunkWidth, height: chunkHeight});
        }
        grid.push(row);
    }
    return grid;
};

export var mapService = (window) => window.define('my/mapService', [
    'conf/conf',
], function (
    conf,
) {
    const delay = ms => new Promise(res => setTimeout(res, ms));

    window.angular.extend(EventTypeProvider, {
        MAP_DATA_LOAD_STARTED: 'map_data_load_started',
        MAP_DATA_LOADED_ERROR: 'map_data_loaded_error',
        MAP_DATA_LOADED_SUCCESS: 'map_data_loaded_success',

        TOWN_DATA_LOAD_STARTED: 'town_data_load_started',
        TOWN_DATA_LOAD_ERROR: 'town_data_load_error',
        TOWN_DATA_LOAD_SUCCESS: 'town_data_load_success'
    });

    const mapService = {};

    mapService.loadMap = async (progressCallback, delayMs = 200) => {
        try {
            const minimapGrid = getMinimapGrid(conf.MAP_SIZE, 306, 306).flatMap(g => g);
            $rootScope.$broadcast(EventTypeProvider.MAP_DATA_LOAD_STARTED, minimapGrid)
            const requests = minimapGrid.map((cell, i) =>
                new Promise((resolve, reject) => {
                    delay(delayMs * i).then(() => {
                        SocketService.emit(RouteProvider.MAP_GET_MINIMAP_VILLAGES, cell, (data) => {
                            if (data.message) {
                                reject(data.message);
                            } else {
                                resolve(data);
                            }
                            progressCallback && progressCallback(cell, i, minimapGrid, data);
                        });
                    });
                })
            );
            const results = await Promise.all(requests);
            $rootScope.$broadcast(EventTypeProvider.MAP_DATA_LOADED_SUCCESS, results);
        } catch (error) {
            console.log(error)
            $rootScope.$broadcast(EventTypeProvider.MAP_DATA_LOADED_ERROR, error);
        }
    };

    mapService.loadTowns = async ({minX, maxX, minY, maxY, charID}, progressCallback, delayMs = 200) => {
        const step = 50;

        let XY = []

        for (let x = minX; x <= maxX; x += step) {
            for (let y = minY; y <= maxY; y += step) {
                XY.push({x: x, y: y})
            }
        }

        try {
            $rootScope.$broadcast(EventTypeProvider.TOWN_DATA_LOAD_STARTED, XY)
            const requests = XY.map((xy, i) =>
                new Promise((resolve, reject) => {
                    delay(delayMs * i).then(() => {
                        SocketService.emit(RouteProvider.MAP_GETVILLAGES, {
                            x: xy.x,
                            y: xy.y,
                            width: step,
                            height: step,
                            character_id: charID,
                        }, (data) => {
                            if (data.message) {
                                reject(data.message);
                            } else {
                                resolve(data);
                            }
                            progressCallback && progressCallback(xy, i, XY, data)
                        })
                    });
                }));
            await Promise.all(requests);
            $rootScope.$broadcast(EventTypeProvider.TOWN_DATA_LOAD_SUCCESS)
        } catch (error) {
            console.log(error)
            $rootScope.$broadcast(EventTypeProvider.TOWN_DATA_LOAD_ERROR, error)
        }
    };

    return mapService;
});
