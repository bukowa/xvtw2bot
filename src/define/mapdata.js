import * as svc from "../modules/services"
import {
    $rootScope, EventTypeProvider,
    RouteProvider,
    SocketService,
} from "../modules/services";


export const getGrid = (size, width, height) => {
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

export var mapData = (window) => window.define('my/mapData', [
    'conf/conf',
], function (
    conf
) {

    window.angular.extend(EventTypeProvider, {
        MAP_DATA_LOAD_STARTED: 'map_data_load_started',
        MAP_DATA_LOADED_SUCCESS: 'map_data_loaded_success',
        MAP_DATA_LOADED_ERROR: 'map_data_loaded_error'
    });

    const _mapData = {};

    _mapData.load = async (progressCallback) => {
        try {
            const delay = ms => new Promise(res => setTimeout(res, ms));
            const grid = getGrid(conf.MAP_SIZE, 306, 306).flatMap(g => g);
            const requests = grid.map((cell, i) => {
                return new Promise((resolve, reject) => {
                    delay(200 * i).then(() => {
                        SocketService.emit(RouteProvider.MAP_GET_MINIMAP_VILLAGES, cell, (data) => {
                            if (data.message) {
                                reject(data.message);
                            } else {
                                resolve(data);
                            }
                            progressCallback && progressCallback(cell, i, grid);
                        });
                    });
                });
            });

            const results = await Promise.all(requests);
            $rootScope.$broadcast(EventTypeProvider.MAP_DATA_LOADED_SUCCESS, results);
        } catch (error) {
            $rootScope.$broadcast(EventTypeProvider.MAP_DATA_LOADED_ERROR, error);
        }
    };

    return _mapData;
});
