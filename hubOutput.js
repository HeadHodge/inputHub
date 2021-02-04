////////////////////////////////////////////
//            GLOBAL VARIABLES
////////////////////////////////////////////
const http = require('http');
const debug = require('/controlHub/hubDebug.js').debug;

const options = {
  host: '192.168.0.160',
  port: 5050,
  path: '/api/appdaemon/ipRemoteCommand',
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/text; charset=UTF-8'
  }
};

//##########################################
const onReply = function(reply) {
//##########################################
debug.log(`Enter onReply, statusCode: ${reply.statusCode}`);
var buffer = '';

	reply.on('data', function(reply) {
		console.log('Task server reply: ' + reply);
		buffer += reply;
	});

	reply.on('end', function () {
		//console.log(buffer);
	});
};

//##########################################
const sendTasks = function(task) {
//##########################################
debug.log(`Enter sendTasks`);
var request = http.request(options, onReply);	

	request.on('error', function (error) {
		console.error(`Encountered an error trying to make a request: ${error.message}`);
	});

	console.log(`sendTasks to task server:\n${task}\n.`);
	request.write(task);
	request.end();
};

////////////////////////////////////////////
//                MAIN
//Open connection with Hub and send request
////////////////////////////////////////////
	debug.log('Started hubOutput');
	exports.sendTasks = sendTasks;