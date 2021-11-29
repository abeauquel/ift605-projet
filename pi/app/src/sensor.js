const tStep = 30;
const ACTION = 'accel';
const fs = require('fs');
const readline = require('readline');

let bufferPrecedent = [];
let buffer = [];
let bufferSuivante = [];

let interval;

const G = 9.81;

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

            // acceleration
            x = x * G; // metre par seconce^2
            y = y * G; // metre par seconce^2
            z = ( z - 1) * G; // metre par seconce^2

            let data = {};
            data.action = ACTION;
            data.roll = roll;
            data.pitch = pitch;
            data.x = x;
            data.y = y;
            data.z = z;

            if(buffer.length !== 0)
                bufferSuivante.push(data);

            if(bufferPrecedent.length !== 0)
                buffer.push(data)

            bufferPrecedent.push(data);
        }
    });


    let vel = {};
    vel.x = 0.0;
    vel.y = 0.0;
    vel.z = 0.0;

    let vel_old = {};
    vel_old.x = 0.0;
    vel_old.y = 0.0;
    vel_old.z = 0.0;

    let accel_old = {};
    accel_old.x=0.0;
    accel_old.y=0.0;
    accel_old.z=0.0;

    let disp = {};
    disp.x=0.0;
    disp.y=0.0;
    disp.z=0.0;

    let disp_old = {};
    disp_old.x=0.0;
    disp_old.y=0.0;
    disp_old.z=0.0;
    let timestep = 0.03;
    interval = setInterval(function(str1, str2) {

        if(bufferSuivante.length > 0){
            disp.x = disp_old.x + (vel.x - vel_old.x) * timestep / 2.0;
            disp.y = disp_old.y + (vel.y - vel_old.y) * timestep / 2.0;
            disp.z = disp_old.z + (vel.z - vel_old.z) * timestep / 2.0;

            disp_old = disp;
            let data = {};
            data.action = ACTION;
            data.x = disp.x;
            data.y = disp.y;
            data.z = disp.z;
            ws.send(JSON.stringify(data));
            console.log(disp);

        }

        if(buffer.length > 0){
            let data = buffer.shift();
            vel.x = vel_old.x + (data.x - accel_old.x) * timestep / 2.0;
            vel.y = vel_old.y + (data.y - accel_old.y) * timestep / 2.0;
            vel.z = vel_old.z + (data.z - accel_old.z) * timestep / 2.0;

            vel_old.x = vel.x;
            vel_old.y = vel.y;
            vel_old.z = vel.z;
        }

        if(bufferPrecedent.length > 0){
            let data = bufferPrecedent.shift();
            accel_old.x = data.x;
            accel_old.y = data.y;
            accel_old.z = data.z;
        }

    }, tStep, "Hello.", "How are you?");

}

let stopSensor = function (){
    clearInterval(interval);
}

module.exports = {
    start : readFile,
    stop : stopSensor
};
