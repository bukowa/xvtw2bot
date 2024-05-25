export const name = 'api';

export var ModelService;
export var SocketService;
export var RouteProvider;

export class Scout {
    static BUILDINGS = 'buildings';
    static UNITS = 'units';
}

export class Data {
    /**
     * @param {number} vStart The string
     * @param {number} vTarget The string
     * @param {number} spys The string
     * @param {string} type 'units' or 'buildings'
     */
    static SCOUTING_SEND_COMMAND = function (vStart, vTarget, spys, type) {
        return {
            "startVillage": vStart,
            "targetVillage": vTarget,
            "spys": spys,
            "type": type,
        }
    };
    /**
     * @param {number} command_id
     */
    static SCOUTING_CANCEL_COMMAND = function(command_id) {
        return {
            'command_id': command_id,
        }
    }
}

export function Init() {
    ModelService = window.injector.get("modelDataService")
    SocketService = window.injector.get("socketService")
    RouteProvider = window.injector.get("routeProvider")
    Routes.SCOUTING_SEND_COMMAND = RouteProvider.SCOUTING_SEND_COMMAND
    Routes.SCOUTING_CANCEL_COMMAND = RouteProvider.SCOUTING_CANCEL_COMMAND
    Routes.SCOUTING_RECRUIT = RouteProvider.SCOUTING_RECRUIT
    Routes.SCOUTING_CANCEL_RECRUIT = RouteProvider.SCOUTING_CANCEL_RECRUIT
    Routes.QUESTS_GET_QUEST_LINES = RouteProvider.QUESTS_GET_QUEST_LINES
}

export class Routes {
    static SCOUTING_SEND_COMMAND
    static SCOUTING_CANCEL_COMMAND
    static SCOUTING_RECRUIT
    static SCOUTING_CANCEL_RECRUIT
    static QUESTS_GET_QUEST_LINES
}

export function GameApi(route, data, f) {
    SocketService.emit(route, data, f)
}
