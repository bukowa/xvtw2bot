

// village selected broadcast "Internal/Map/selectVillage" and load minimap


setupGrid = function setupGrid() {
    var xChunks = Math.ceil(MAP_SIZE / minimapWidth),
        yChunks = Math.ceil(MAP_SIZE / minimapHeight),
        offsetX = dX % minimapWidth,
        offsetY = dY % minimapHeight,
        chunkWidth,
        chunkHeight,
        chunkX,
        chunkY;

    // grid cell should fit minimap viewport size
    // also calculate grid offset so that we can get villages on initial position in one request
    for (var gridX = 0; gridX < xChunks; gridX++) {
        grid.push([]);

        chunkX = minimapWidth * gridX - offsetX;
        chunkWidth = minimapWidth.bound(0, chunkX + minimapWidth).bound(0, MAP_SIZE - chunkX);
        chunkX = chunkX.bound(0, MAP_SIZE);

        for (var gridY = 0; gridY < yChunks; gridY++) {
            chunkY = minimapHeight * gridY - offsetY;
            chunkHeight = minimapHeight.bound(0, chunkY + minimapHeight).bound(0, MAP_SIZE - chunkY);
            chunkY = chunkY.bound(0, MAP_SIZE);

            // use Math.round because there may be float numbers if browser zoom is other than 100%
            grid[gridX].push({x: Math.round(chunkX), y: Math.round(chunkY),
                width: Math.round(chunkWidth), height: Math.round(chunkHeight)});
        }
    }
}
