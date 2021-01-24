////////////////////////////////////////////
//            GLOBAL VARIABLES
////////////////////////////////////////////
const os = require('os');
const hubInput = require('/scripts/modules/hubInput.js');
var tasks, clientOptions={};
var primaryController={};

//##########################################
const onCommand = function(clientId, clientCommand) {
//##########################################
console.log(`Enter onCommand for clientCommand: ${clientCommand}`);
var hubOutput = require('/scripts/modules/hubOutput.js');
var sequence, task;

	//focusOptions = require(`/scripts/modules/controllers/masterBedroom.entertainment.js`);
	primaryController = require(clientOptions[clientId].primaryController);
	sequence = primaryController.tasks[clientCommand];
	if(!sequence) return console.log(`Abort: Invalid clientCommand: ${clientCommand}`);
	
	task = `{"action": "runSequence", "sequence": ${JSON.stringify(primaryController.tasks[clientCommand])}}`;
	//console.log(`Send Task: ${task}`);
	hubOutput.sendControlTask(task);
	//$case.postCommand({"action": "runSequence", "sequence": [{"remote/send_command": {"entity_id": "remote.rm4_ir_hub_remote", "device": "Vizio", "command": "On/Off"}}, {"androidtv/adb_command": {"entity_id": "media_player.firetv_masterbedroom", "command": "POWER"}}]});
};

//##########################################
const onFunction = function(clientId, clientCommand) {
//##########################################
console.log(`Enter onFunction with ${clientCommand} in zone: ${clientOptions[clientId].zone}`);

	clientOptions[clientId].isFunctionSet = null;
};
 
//##########################################
const onFocus = function(clientId, clientCommand) {
//##########################################
console.log(`Enter onFocusChange with ${clientCommand} in zone ${clientOptions[clientId].zone}`);

	clientOptions[clientId].isFocusSet = null;
	
	if(!clientOptions[clientId].topics[clientCommand]) {
		console.log(clientOptions[clientId].topics[clientOptions[clientId].focus].controller[clientCommand]);
		clientOptions[clientId].popupController = clientOptions[clientId].topics[clientOptions[clientId].focus].controller[clientCommand];
		return console.log(`popupController selected: ${clientOptions[clientId].popupController}`);
	};
	
	clientOptions[clientId].primaryController = clientOptions[clientId].topics[clientCommand].controller.clientCommand;
	console.log(`primaryController changed to: ${clientOptions[clientId].primaryController}`);
};
 
//##########################################
const onInput = function(client) {
//##########################################
clientOptions[client.controlInput.id] = require(`/scripts/modules/clients/${client.controlInput.id}.js`);
var controller = clientOptions[client.controlInput.id].topics[clientOptions[client.controlInput.id].focus].controller[clientOptions[client.controlInput.id].focus];
//var controller = clientOptions[client.controlInput.id].topics[clientOptions[client.controlInput.id].focus].controller.clientOptions[client.controlInput.id].focus;
console.log(controller);
console.log(`Enter onInput, clientCommand: ${client.controlInput.command}, clientId: ${client.controlInput.id}, clientZone: ${clientOptions[client.controlInput.id].zone}`);

	if(client.controlInput.command == 'Focus') {clientOptions[client.controlInput.id].isFocusSet = true; return console.log(`Set Focus Flag`);}
	if(client.controlInput.command == 'Enter') {clientOptions[client.controlInput.id].isFunctionSet = true; return console.log(`Set Function Flag`);}
	
	if(clientOptions[client.controlInput.id].isFocusSet) return onFocus(client.controlInput.id, client.controlInput.command);
	if(clientOptions[client.controlInput.id].isFunctionSet) return onFunction(client.controlInput.id, client.controlInput.command);

	if(client.controlInput.command == 'On/Off' || client.controlInput.command == 'Set') {
		if(clientOptions[client.controlInput.id].isOn)
			{client.controlInput.command = 'Off';clientOptions[client.controlInput.id].isOn=false;}
		else
			{client.controlInput.command = 'On';clientOptions[client.controlInput.id].isOn=true;}
	};
	
	if(client.controlInput.command == 'Silence/Sound') {
		if(clientOptions[client.controlInput.id].isSilent)
			{client.controlInput.command = 'Sound';clientOptions[client.controlInput.id].isSilent=false;}
		else
			{client.controlInput.command = 'Silence';clientOptions[client.controlInput.id].isSilent=true;}
	};
	
	onCommand(client.controlInput.id, client.controlInput.command);
};
		
////////////////////////////////////////////
//                MAIN
//Open server to listen for control input
////////////////////////////////////////////
console.log(`Started hubControl on ${os.hostname}`);

	hubInput.listen(onInput);
