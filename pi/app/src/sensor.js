
const fs = require('fs');
const readline = require('readline');

let bufferIMoins1 = [];
let buffer = [];
let bufferIPlus1 = [];

let interval;

const G = 9.81;
const tStep = 30;
const ACTION = 'accel';
const timestep = 0.03;

let readFile = async function (ws){
    console.log("sensor.js"+ new Date());

    const readInterface = readline.createInterface({
        input: fs.createReadStream('displacement.txt')
    });
    let i=0;
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
            data.i = i;
            i++;

            buffer.push(data);
        }
    });


    let vel = { x:0.0, y:0.0, z: 0.0};
    let vel_old = { x:0.0, y:0.0, z: 0.0};
    let accel_old = { x:0.0, y:0.0, z: 0.0};
    let disp = { x:0.0, y:0.0, z: 0.0};
    let disp_old = { x:0.0, y:0.0, z: 0.0};

    let j=0;
    const precision = 1000.0
    interval = setInterval(function(str1, str2) {
        if(j > 2 && buffer.length > 3){
        //     disp.x = disp_old.x + (vel.x + vel_old.x) * timestep / 2.0;
        //     disp.y = disp_old.y + (vel.y + vel_old.y) * timestep / 2.0;
        //     disp.z = disp_old.z + (vel.z + vel_old.z) * timestep / 2.0;
        //
        //     // disp.x = (vel.x + vel_old.x) * timestep / 2.0;
        //     // disp.y = (vel.y + vel_old.y) * timestep / 2.0;
        //     // disp.z = (vel.z + vel_old.z) * timestep / 2.0;
        //
        //     disp_old = disp;
        //     let data = buffer.shift();
        //     data.x = disp.x;
        //     data.y = disp.y;
        //     data.z = disp.z;
        //     ws.send(JSON.stringify(data));
        //     console.log('disp : '+ j);
        //     console.log(disp);
        //
        //     // console.log(buffer[199]);
        //     // console.log(buffer[200]);
        //     // console.log(bufferIPlus1[201]);
        //
        // }
        //
        // if(j > 1 && buffer.length > 3){
        //     let data = buffer[1];
        //     vel.x = vel_old.x + (data.x + accel_old.x) * timestep / 2.0;
        //     vel.y = vel_old.y + (data.y + accel_old.y) * timestep / 2.0;
        //     vel.z = vel_old.z + (data.z + accel_old.z) * timestep / 2.0;
        //
        //     vel_old.x = vel.x;
        //     vel_old.y = vel.y;
        //     vel_old.z = vel.z;
        //     console.log('vel : '+ j);
        //     console.log(vel);
        // }
        //
        // if(buffer.length > 3){
        //     let data = buffer[0];
        //     accel_old.x = data.x * G;
        //     accel_old.y = data.y * G;
        //     accel_old.z = (data.z - 1) * G ;
        //     console.log('accel : '+ j);
        //     console.log(accel_old);
        //
        //     j++;
        //
        // }
            if(buffer.length > 0){
                let data = buffer.shift();
                ws.send(JSON.stringify(data));
            }
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
