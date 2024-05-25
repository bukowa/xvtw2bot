import {ModelService} from "./services";

//ModelService.getGameData().getBuildings()

const LOCATION_TYPES = {
    "MASS_SCREEN": "mass",
    "HEADQUARTER": "hq",
    "CONTEXT_MENU": "menu",
    "QUEUE_SLOT": "slot",
    "VILLAGE_INFO": "info",
    "TIMELINE": "timeline"
}

const upgradeBuilding = function (village, buildingName, callback) {
    socketService.emit(routeProvider.VILLAGE_UPGRADE_BUILDING, {
        building: buildingName,
        village_id: village.getId(),
        location: LOCATION_TYPES.MASS_SCREEN,
        premium: false
    }, callback);
};

// $rootScope.$on(eventTypeProvider.BUILDING_LEVEL_CHANGED, function (event, data) {
//     if (!running) {
//         return false;
//     }
//
//     setTimeout(function () {
//         const village = $player.getVillage(data.village_id);
//         analyseVillageBuildings(village);
//     }, 1000);
// });


const analyseVillagesInstantFinish = function () {
    const villageIds = getVillageIds();
    const buildingQueueService = injector.get('buildingQueueService');
    const premiumActionService = injector.get('premiumActionService');
    const player = modelDataService.getSelectedCharacter();

    villageIds.forEach(function (villageId) {
        const village = player.getVillage(villageId);
        const queue = village.buildingQueue;

        if (queue.getAmountJobs()) {
            const jobs = queue.getQueue();

            jobs.forEach(function (job) {
                if (buildingQueueService.canBeFinishedForFree(job, village)) {
                    premiumActionService.instantBuild(job, LOCATION_TYPES.MASS_SCREEN, true, villageId);
                }
            });
        }
    });
};

