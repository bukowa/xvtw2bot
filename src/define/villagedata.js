
function requestCell(x, y, charID) {
    return new Promise((resolve, reject) => {
        socketService.emit(routeProvider.MAP_GETVILLAGES, {
            'x': x,
            'y': y,
            'width': 50,
            'height': 50,
            'character_id': charID,
        }, (data) => {
            if (data.message) {
                reject(data.message);
            } else {
                resolve(data);
            }
        });
    });
}
