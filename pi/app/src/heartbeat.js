const tStep = 1000;
const ACTION = 'heartbeat';
const fs = require('fs');
const readline = require('readline');

let generateHeartBeat = async function (ws){
    console.log("heartbeat.js "+ new Date());

    let pastHeartBeat = 70;
    let cheatVariation = 5;
    let interval = setInterval(function(str1, str2) {
        let data = {};
        data.action = ACTION;
        let newHeartBeat = pastHeartBeat + cheatVariation;
        let variation = Math.floor(Math.random() * 10);
        let positive = Math.floor(Math.random());
        if(positive)
            newHeartBeat+=variation;
        else
            newHeartBeat-=variation;
        data.value = newHeartBeat;

        if(newHeartBeat < 50)
            cheatVariation = 5;
        if(newHeartBeat > 185)
            cheatVariation = -5;

        pastHeartBeat=newHeartBeat;

        //console.log(data);

        ws.send(JSON.stringify(data));
    }, tStep, "Hello.", "How are you?");

}

module.exports = {
    start : generateHeartBeat
};
