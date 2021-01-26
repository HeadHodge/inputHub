exports.name = 'MasterBedroom Entertainment Tasks';
exports.zone = 'masterBedroom';
exports.focus = 'Up';

exports.tasks = {
	"Home": [
		{"androidtv/adb_command": {"entity_id": "media_player.firetv_masterbedroom", "command": "HOME"}}
	],
	
	"Menu": [
		{"androidtv/adb_command": {"entity_id": "media_player.firetv_masterbedroom", "command": "MENU"}}
	],
		
	"Exit": [
		{"androidtv/adb_command": {"entity_id": "media_player.firetv_masterbedroom", "command": "BACK"}}
	],
	
	"Up": [
		{"androidtv/adb_command": {"entity_id": "media_player.firetv_masterbedroom", "command": "UP"}}
	],
	
	"Down": [
		{"androidtv/adb_command": {"entity_id": "media_player.firetv_masterbedroom", "command": "DOWN"}}
	],
	
	"Left": [
		{"androidtv/adb_command": {"entity_id": "media_player.firetv_masterbedroom", "command": "LEFT"}}
	],
	
	"Right": [
		{"androidtv/adb_command": {"entity_id": "media_player.firetv_masterbedroom", "command": "RIGHT"}}
	],
	
	"Ok": [
		{"androidtv/adb_command": {"entity_id": "media_player.firetv_masterbedroom", "command": "CENTER"}}
	],
	
	"Louder": [
		{"media_player/volume_up"  : {"entity_id": "media_player.master_bedroom"}},
		{"media_player/volume_mute": {"entity_id": "media_player.master_bedroom", "is_volume_muted": false}}
	],
	
	"Softer": [
		{"media_player/volume_down": {"entity_id": "media_player.master_bedroom"}},
		{"media_player/volume_mute": {"entity_id": "media_player.master_bedroom", "is_volume_muted": false}}
	],
			
	"Sound": [
		{"media_player/volume_mute": {"entity_id": "media_player.master_bedroom", "is_volume_muted": false}}
	],
			
	"Silence": [
		{"media_player/volume_mute": {"entity_id": "media_player.master_bedroom", "is_volume_muted": true}}
	],
	
	"Backward": [
		{"androidtv/adb_command": {"entity_id": "media_player.firetv_masterbedroom", "command": "input keyevent --longpress 89"}}
	],
	
	"Start/Stop": [
		{"androidtv/adb_command": {"entity_id": "media_player.firetv_masterbedroom", "command": "input keyevent 85"}}
	],
	
	"Forward": [
		{"androidtv/adb_command": {"entity_id": "media_player.firetv_masterbedroom", "command": "input keyevent --longpress 90"}}
	],
	
	"Open": [
		{"remote/send_command": {"entity_id": "remote.rm4_ir_hub_remote", "device": "Vizio", "command": "On/Off"}},
		{"androidtv/adb_command": {"entity_id": "media_player.firetv_masterbedroom", "command": "POWER"}}
	],
	
	"Open": [
		{"remote/send_command": {"entity_id": "remote.rm4_ir_hub_remote", "device": "Vizio", "command": "On/Off"}},
		{"androidtv/adb_command": {"entity_id": "media_player.firetv_masterbedroom", "command": "POWER"}},
	    {"sleep": 3},
		{"media_player/select_source": {"entity_id": "media_player.master_bedroom", "source": "TV"}}
	],
	
	"Off": [
		{"sonos/unjoin": {"entity_id": "media_player.bathroom"}},
		{"androidtv/adb_command": {"entity_id": "media_player.firetv_masterbedroom", "command": "SLEEP"}},
		{"remote/send_command" : {"entity_id": "remote.rm4_ir_hub_remote", "device": "Vizio", "command": "On/Off"}},
	    {"sleep": 5},
		{"media_player/select_source": {"entity_id": "media_player.master_bedroom", "source": "Blues"}},
		{"media_player/volume_set": {"entity_id": "media_player.master_bedroom", "volume_level": 0.18}},
		{"sonos/set_sleep_timer": {"entity_id": "media_player.master_bedroom", "sleep_time": 3600}}
	],
		
	"On/Off": [
		{"sonos/unjoin": {"entity_id": "media_player.bathroom"}},
		{"androidtv/adb_command": {"entity_id": "media_player.firetv_masterbedroom", "command": "SLEEP"}},
		{"remote/send_command" : {"entity_id": "remote.rm4_ir_hub_remote", "device": "Vizio", "command": "On/Off"}},
	    {"sleep": 5},
		{"media_player/select_source": {"entity_id": "media_player.master_bedroom", "source": "Blues"}},
		{"media_player/volume_set": {"entity_id": "media_player.master_bedroom", "volume_level": 0.2}},
		{"sonos/set_sleep_timer": {"entity_id": "media_player.master_bedroom", "sleep_time": 3600}}
	]
};

////////////////////////////////////////////
//                MAIN
////////////////////////////////////////////
	console.log('masterBedroom.entertainment.js loaded');