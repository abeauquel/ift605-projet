const tStep = 100;
const ACTION = 'exercice';

let start = async function (ws){
    console.log("exercice.js"+ new Date());

    let name = "Squat";
    let repetitionInSet = 12;
    let repetition = 12;
    let set = 5;
    let tic = 0;
    let variationY = -0.05;
    let doubleTic =0;
    let interval = setInterval(function(str1, str2) {
            let data = {};
            data.action = ACTION;
            data.name= name;
            data.repetition = repetition;
            data.set = set;
            data.y = variationY;
            data.z = 0.0;
            data.x = 0.0;
            ws.send(JSON.stringify(data));

            tic+=1;
            if(tic > 40){
                tic =0;
                doubleTic+=1;
                variationY= variationY * -1;
                if(doubleTic === 2){
                    doubleTic = 0;
                    repetition--;
                    if(repetition < 1){
                        set--;
                        repetition = repetitionInSet;
                    }
                }

            }


    }, tStep, "Hello.", "How are you?");
}

module.exports = {
    start : start
};
