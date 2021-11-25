const tStep = 50;
//websocket
const WebSocket = require('ws')
// Create a server object
const wss = new WebSocket.Server({ port: 9898 })

let readFile = function (ws){
    const lineReader = require('readline').createInterface({
        input: require('fs').createReadStream('output.txt')
    });
    lineReader.on('line', function (line) {
        if(line){
            let array = line.split('/')
            let roll = parseFloat(array[0]);
            let pitch = parseFloat(array[1]);
            let x = parseFloat(array[2]);
            let y = parseFloat(array[3]);
            let z = parseFloat(array[4]);
            //console.log( array);
            const date = new Date();
            let curDate = null;
            do { curDate = new Date(); }
            while(curDate-date < tStep);
            let data = {};
            data.roll = roll;
            data.pitch = pitch;
            data.x = x;
            data.y = y;
            data.z = z;
            console.log(data);
            ws.send(JSON.stringify(data));

        }
    });
}


let start = function (){
    console.log("sensor.js");
    wss.on('connection', ws => {
        // ws.on('message', message => {
        //     console.log(`Received message => ${message}`)
        // })
        readFile(ws);
    })
}

module.exports = {
    start : start

};
