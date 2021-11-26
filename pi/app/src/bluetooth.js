const fs = require('fs');
const { exec } = require("child_process");
const { spawn } = require('child_process');
const execSetupRFCOMM0 = spawn('sh', ['setupRFCOMM.sh']);

const input = "/dev/rfcomm0";
let callBackCommand = function (val){};
let eventEmitter = null;
let readStream;

function execSysCall(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                reject(error);
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                reject(stderr);
            }

            resolve(stdout);
        });
    });

}

async function setupRFCOMM(){
    console.log("setupRFCOMM ...");
    console.log("Restart BlueZ in compatibility mode ...");
    let i = 0;
    try {

        execSetupRFCOMM0.stdout.on('data', (data) => {
            //console.log(`stdout: ${data}`);

            console.log("Waiting device connection ...");
            let startRFCOMM0 = spawn('sudo', ['stdbuf','-i0', '-o0', '-e0', 'rfcomm', 'watch', '/dev/rfcomm0', '0']);
            startRFCOMM0.stdout.on('data', (data) => {

                if(data.includes('Connection')){
                    waitingCommand();
                    eventEmitter.emit('connection-true');
                }
                if(data.includes('Disconnected')){
                    eventEmitter.emit('connection-false');
                    readStream.close();
                }
                //console.log(`stdout: ${data}`);
            });
        });

    } catch(error) {
        console.error( error);
    }

}

async function waitingCommand(){
    console.log("chmod device file");
    await execSysCall("sudo chmod 777 /dev/rfcomm0");
    console.log("waitingCommand ...");

    readStream = fs.createReadStream(input);
    readStream.on('data', function (data) {
        isConnected = true;
        let str = data.toString().trim();
        console.log('readStream : ' + str);
        callBackCommand(str);
    });
}

function sendMessage(value){
    let text = '\n'+value;
    fs.appendFile(input, text, function (err) {
        if (err) throw err;
    });
    console.log('end()');

}



async function startALL(listenerCommand, peventEmitter){
    callBackCommand = listenerCommand;
    eventEmitter = peventEmitter;
    await setupRFCOMM();
}

module.exports = {
    startALL : startALL,
    sendMessage
};
