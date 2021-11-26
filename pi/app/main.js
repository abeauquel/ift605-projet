const bluetooth = require('./src/bluetooth.js');
const sensor = require('./src/sensor.js');
const heartbeat = require('./src/heartbeat.js');
const exercice = require('./src/exercice.js');
const actionFunctions = require('./src/action');


//Server Web
const hostname = "127.0.0.1";
const port = 8000;
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();


router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
});

router.get('/js/three.js',function(req,res){
    res.sendFile(path.join(__dirname+'/js/three.js'));
});


app.listen(port, hostname, () => {
    console.log(`Le serveur tourne à l'adresse http://${hostname}:${port}/`);
})

app.use('/', router);




let listenerRFCOMM = function (val) {
    let messages = actionFunctions.parseMessages(val);
    for (let message of messages) {
        console.log(message);
        let action = actionFunctions.deserializeAction(message);

        console.log(action);
    }
}

var events = require('events');
var eventEmitter = new events.EventEmitter();
let myWs = null;
//Create an event handler:
let eventOnConnection = function () {
    console.log('Connection true');
    let data = {};
    data.action = 'connection';
    data.value = true;
    if (myWs)
        myWs.send(JSON.stringify(data));
}

let eventOnDisConnection = function () {
    console.log('Connection false');
    let data = {};
    data.action = 'connection';
    data.value = false;
    if (myWs)
        myWs.send(JSON.stringify(data));
};

//Assign the event handler to an event:
eventEmitter.on('connection-true', eventOnConnection);
eventEmitter.on('connection-false', eventOnDisConnection);

bluetooth.startALL(listenerRFCOMM, eventEmitter);



const WebSocket = require('ws')
// Create a server object
const wss = new WebSocket.Server({ port: 9898 })



wss.on('connection', ws => {
    myWs = ws;
    start(ws);
})
let start = async function(ws){
    heartbeat.start(ws);
    exercice.start(ws);
    sensor.start(ws);
}




