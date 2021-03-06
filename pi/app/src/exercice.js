const tStep = 100;
const ACTION = 'exercice';
let interval;

let start = async function (ws, eventEmitter){
    console.log("exercice.js"+ new Date());

    let name = "Kettlebell swing";
    let repetitionInSet = 12;
    let repetition = 5;
    let set = 10;
    // repetition = 12; //todo test
     set = 1; //todo test
    let tic = 0;
    let sens = 1;
    let doubleTic =0;
    let x =0;
    let y= 0;
    let z = 0;
    let variation = 0.08;
    interval = setInterval(function(str1, str2) {
        y += variation * sens;
        x += variation * sens;
        let data = {};
        data.action = ACTION;
        data.name= name;
        data.repetition = repetition;
        data.set = set;
        data.y = y;
        data.x = x;
        data.z = 0.0;
        ws.send(JSON.stringify(data));

        tic+=1;
        if(tic > 45){
            tic =0;
            doubleTic+=1;
            sens = sens * -1;
            if(doubleTic === 2){
                doubleTic = 0;
                repetition--;
                if(repetition < 1){
                    set--;
                    repetition = repetitionInSet;
                }
            }

        }

        //fin du training
        if(set < 1 ){
            eventEmitter.emit('end-training');
        }

    }, tStep, "Hello.", "How are you?");
}

let stop = function (){
    clearInterval(interval);
}

module.exports = {
    start : start,
    stop : stop
};
