import {ModelService} from "./services";

const unitypes  = {
    'ARCHER'			: 'archer',
    'AXE'				: 'axe',
    'CATAPULT'			: 'catapult',
    'DOPPELSOLDNER'		: 'doppelsoldner',
    'HEAVY_CAVALRY'		: 'heavy_cavalry',
    'KNIGHT'			: 'knight',
    'LIGHT_CAVALRY'		: 'light_cavalry',
    'MOUNTED_ARCHER'	: 'mounted_archer',
    'RAM'				: 'ram',
    'SNOB'				: 'snob',
    'SPEAR'				: 'spear',
    'SWORD'				: 'sword',
    'TREBUCHET'			: 'trebuchet'
};

const unit_costs = {
    'SPEAR': {
        'wood': 50,
        'clay': 30,
        'iron': 20,
    },
}

// switch (recruitingQueueType) {
//     case recruitingQueueTypes.BARRACKS:
//         messageType = routeProvider.BARRACKS_RECRUIT;
//         break;
//     case recruitingQueueTypes.ACADEMY:
//         messageType = routeProvider.ACADEMY_RECRUIT;
//         break;
//     case recruitingQueueTypes.PRECEPTORY:
//         messageType = routeProvider.PRECEPTORY_RECRUIT;
//         break;
//     case recruitingQueueTypes.STATUE:
//         messageType = routeProvider.STATUE_RECRUIT;
//         break;
// }
//

socketService.emit(routeProvider.BARRACKS_RECRUIT, {
    'village_id'	: ModelService.getSelectedVillage().getId(),
    'unit_type'		: 'spear',
    'amount'		: 1
});

