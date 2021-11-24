const bluetooth = require('./src/bluetooth.js');
const actionFunctions = require('./src/action');

listenerRFCOMM = function(val) {
    let messages = actionFunctions.parseMessages(val);
    for (let message of messages) {
        console.log(message);
        let action = actionFunctions.deserializeAction(message);

        console.log(action);
    }
}

listenerConnection = function(val) {
    if (val)
        console.log('connection '+ new Date())
    else
        console.log('disconnection '+ new Date())
};

//bluetooth.startALL(listenerRFCOMM, listenerConnection);


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



//websocket
const WebSocket = require('ws')
// Create a server object
const wss = new WebSocket.Server({ port: 9898 })

wss.on('connection', ws => {
    ws.on('message', message => {
        console.log(`Received message => ${message}`)
    })
    ws.send('Hello! Message From Server!!');
    for (let i = 0; i < 1000; i++) {
        const date = new Date();
        let curDate = null;
        do { curDate = new Date(); }
        while(curDate-date < 100);
        ws.send('bouge cube');
    }

})

