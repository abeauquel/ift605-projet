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
let idClient = 4;
let idTraining = 7;
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


//Bluetooth
let listenerRFCOMM = function (val) {
    let messages = actionFunctions.parseMessages(val);
    for (let message of messages) {
        console.log(message);
        let action = actionFunctions.deserializeAction(message);
        if(action.action === 'start_training'){
            idTraining = action.idTraining;
            idClient = action.idClient;
            //todo recup idClient
            training.getTraining(idTraining, startTraining);
        }
    }
}



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


//websocket
const wss = new WebSocket.Server({ port: 9898 })


wss.on('connection', ws => {
    myWs = ws;
    heartbeat.start(ws);
    //training.getTraining(7, startTraining);
})
let start = async function(ws){

    exercice.start(ws, eventEmitter);
    sensor.start(ws);
}


//training
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

let endTraining = function(){
    console.log("endTraining");
    exercice.stop()
    sensor.stop();
    //heartbeat.stop();
    //todo body for test
    let body = JSON.stringify({"tpsTotalMinute":50,"nbCalorie":200,"bpmMoyen":140,"bpmMin":100,"bpmMax":180,"pourcentageRealise":100,"vitesseExecutionMoyenne":10,"description":"my super training termine, pas facile","client":{"id":4},"training":{"id":7}})
    training.postTrainingReport(body, eventEmitter);
}
eventEmitter.on('end-training', endTraining);

let endTrainingOk = function(){
    console.log("endTrainingOk");
    //todo recup id report
    let data = {};
    data.action = 'end-training';

    setTimeout(() => {  myWs.send(JSON.stringify(data));}, 3000);
}

eventEmitter.on('end-training-ok', endTrainingOk);




