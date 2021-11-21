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

bluetooth.startALL(listenerRFCOMM, listenerConnection);