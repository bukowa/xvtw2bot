
QUEST_GOALS = {
    'ACCEPT_MARKET_OFFERS'		: 'accept_market_offers',
    'ACTIVATE_COUNTERMEASURES'	: 'activate_countermeasures',
    'CLOSE_QUEST_LINE_QUESTS'	: 'close_quest_line_quests',
    'CREATE_MARKET_OFFERS'		: 'create_market_offers',
    'CREATE_TRIBE'				: 'create_tribe',
    'HAVE_BUILDING_LEVEL'		: 'have_building_level',
    'HAVE_SPIES'				: 'have_spies',
    'INVITE_TRIBE_MEMBERS'		: 'invite_tribe_members',
    'KILL_SPIES'				: 'kill_spies',
    'PERFORM_SCOUTING'			: 'perform_scouting',
    'RECRUIT_PALADIN'			: 'recruit_paladin',
    'RENAME_PALADIN'			: 'rename_paladin',
    'RENAME_TRIBE'				: 'rename_tribe',
    'SEND_COMMAND'				: 'send_command',
    'SEND_RESOURCES'			: 'send_resources',
    'TRAIN_SPIES'				: 'train_spies',
    'USE_ITEM'					: 'use_item',
    'RECRUIT_UNITS'				: 'recruit_units',
    'HAVE_UNITS'				: 'have_units',
    'UPGRADE_BUILDING'			: 'upgrade_building'
};

let hasQuests = function (store){

}


// build all camps 1
// build farm 2
// activate wood
// build magazine 2
// build all camps 2
// build all camps 3
// new <<<<
// build magazine 3
// build all camps 4
// collect deposit each 1 by 1
// <<< after camps 4 start and collect job from 2nd village

// <<< after deposit (starting is enough)
// buiild magazine 4
// build camps 5
// <<< after 2nd village quest
// collect despoit each 1 by 1

inventoryService = injector.get('inventoryService');

// activate wood (after taking rewards from farm quest)
inventoryService.useItem(item, function() {
    socketService.emit(routeProvider.PREMIUM_USE_ITEM, {
        'village_id': modelDataService.getSelectedVillage().getId(),
        'item_id': 9065 // wood
    });
})