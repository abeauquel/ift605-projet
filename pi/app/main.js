const bluetooth = require('./src/bluetooth.js');
const sensor = require('./src/sensor.js');
const heartbeat = require('./src/heartbeat.js');
const exercice = require('./src/exercice.js');
const training = require('./src/training.js');
const actionFunctions = require('./src/action');

const WebSocket = require('ws');
const events = require('events');
const eventEmitter = new events.EventEmitter();

//Server Web
const hostname = "127.0.0.1";
const port = 8000;
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
let myWs = null;

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


let startTraining = function(training){
    let data = {};
    data.action = 'training';
    data.training = training.name;
    data.coach = training.creator.userName + " / "+ training.creator.firstName + " " + training.creator.lastName;
    data.exercices = " ";
    for (let i = 0; i < training.exerciceInTrainingList.length; i++) {
        data.exercices+= training.exerciceInTrainingList[i].exercice.name + ", ";
    }
    if (myWs != null){
        myWs.send(JSON.stringify(data));
        setTimeout(() => {  start(myWs);}, 6000);
    }
}

let listenerRFCOMM = function (val) {
    let messages = actionFunctions.parseMessages(val);
    for (let message of messages) {
        console.log(message);
        let action = actionFunctions.deserializeAction(message);
        if(action.action === 'start_training'){
            let id = action.id;
            training.getTraining(id, startTraining);
        }
        //console.log(action);
    }
}



//Create an event handler:
let eventOnConnection = function () {
    console.log('Connection true');
    let data = {};
    data.action = 'connection';
    data.value = true;
    if (myWs != null)
        myWs.send(JSON.stringify(data));
}

let eventOnDisConnection = function () {
    console.log('Connection false');
    let data = {};
    data.action = 'connection';
    data.value = false;
    if (myWs != null)
        myWs.send(JSON.stringify(data));
};

eventEmitter.on('connection-true', eventOnConnection);
eventEmitter.on('connection-false', eventOnDisConnection);

bluetooth.startALL(listenerRFCOMM, eventEmitter);



// Create a server object
const wss = new WebSocket.Server({ port: 9898 })


wss.on('connection', ws => {
    myWs = ws;
    heartbeat.start(ws);
    //training.getTraining(7, startTraining);
})
let start = async function(ws){

    exercice.start(ws);
    sensor.start(ws);
}




