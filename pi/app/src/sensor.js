const tStep = 30;
const ACTION = 'accel';
const fs = require('fs');
const readline = require('readline');

let buffer = [];
let readFile = async function (ws){
    console.log("sensor.js"+ new Date());

    const readInterface = readline.createInterface({
        input: fs.createReadStream('output.txt')
    });

    readInterface.on('line', async function (line) {
        if (line) {
            let array = line.split('/')
            let roll = parseFloat(array[0]);
            let pitch = parseFloat(array[1]);
            let x = parseFloat(array[2]);
            let y = parseFloat(array[3]);
            let z = parseFloat(array[4]);
            let data = {};
            data.action = ACTION;
            data.roll = roll;
            data.pitch = pitch;
            data.x = x;
            data.y = y;
            data.z = z;
            buffer.push(data);
        }
    });

    let interval = setInterval(function(str1, str2) {
        if(buffer.length >0){
            let data = buffer.shift();
            ws.send(JSON.stringify(data));
        }
    }, tStep, "Hello.", "How are you?");
}

module.exports = {
    start : readFile
};
