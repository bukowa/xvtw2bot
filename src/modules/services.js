export const name = 'api';

export var ModelService;
export var SocketService;
export var RouteProvider;
export var EventTypeProvider;
export var $timeout;
export var $rootScope;
export var VillageService;
export var BuildingService;

export function Init() {
    ModelService = window.injector.get("modelDataService")
    SocketService = window.injector.get("socketService")
    RouteProvider = window.injector.get("routeProvider")
    EventTypeProvider = window.injector.get("eventTypeProvider")
    $rootScope = injector.get('$rootScope');
    $timeout = injector.get('$timeout');
    VillageService = injector.get('villageService');
    BuildingService = injector.get('buildingService');

    Routes.SCOUTING_SEND_COMMAND = RouteProvider.SCOUTING_SEND_COMMAND
    Routes.SCOUTING_CANCEL_COMMAND = RouteProvider.SCOUTING_CANCEL_COMMAND
    Routes.SCOUTING_RECRUIT = RouteProvider.SCOUTING_RECRUIT
    Routes.SCOUTING_CANCEL_RECRUIT = RouteProvider.SCOUTING_CANCEL_RECRUIT
    Routes.QUESTS_GET_QUEST_LINES = RouteProvider.QUESTS_GET_QUEST_LINES
    Routes.MAP_GET_MINIMAP_VILLAGES = RouteProvider.MAP_GET_MINIMAP_VILLAGES
}

export class Routes {
    static SCOUTING_SEND_COMMAND
    static SCOUTING_CANCEL_COMMAND
    static SCOUTING_RECRUIT
    static SCOUTING_CANCEL_RECRUIT
    static QUESTS_GET_QUEST_LINES
    static MAP_GET_MINIMAP_VILLAGES
}

export function SvcEmit(route, data, f) {
    SocketService.emit(route, data, f)
}
