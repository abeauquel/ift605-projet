const sender="sender";
const receiver="receiver";
const action ="action" ;

function serializeAction(string){
    let command= null;
    command = JSON.parse(string);
    if(!command.hasOwnProperty(sender))
        throw 'error, no property in command for sender';

//    if(!command.hasOwnProperty(receiver))
//        throw 'error, no property in command for receiver';

    if(!command.hasOwnProperty(action))
        throw 'error, no property in command for action';

    return command;
}

function deserializeAction(string){
    let cmdaction= null;
    try {
        cmdaction = JSON.parse(string);
        if(!cmdaction.hasOwnProperty(sender)){
            throw 'error, no property in action for sender';
        }
        if(!cmdaction.hasOwnProperty(receiver)){
            throw 'error, no property in action for receiver';
        };
        if(!cmdaction.hasOwnProperty(action)){
            throw 'error, no property in action for action';
        };

    } catch (e) {
        console.log('error in serialize action');
        console.log(e);
        return cmdaction;
    }
    return cmdaction;
}

function parseMessages(input){
    let messages = [];

    const OUVERTURE = '{';
    const FERMETURE = '}';
    let temp = "";
    let nbOuverture = 0;
    let nbFermeture = 0;
    for (var i = 0; i < input.length; i++) {
        let letter = input[i];
        temp+= letter;
        if(OUVERTURE === letter)
            nbOuverture+=1;
        if(FERMETURE === letter)
            nbFermeture+=1;

        if(temp !== "" && nbOuverture === nbFermeture){
            messages.push(temp);
            temp="";
        }
    }

    return messages;
}

module.exports = {
    serializeAction,
    deserializeAction,
    parseMessages
}