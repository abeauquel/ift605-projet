const request = require('request');
const optionsGetTraining = {
    'method': 'GET',
    'url': 'http://167.114.144.189:8081/trainings',
    'headers': {}
};
var optionsPostReport = {
    'method': 'POST',
    'url': 'http://167.114.144.189:8081/trainingReport',
    'headers': {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"tpsTotalMinute":50,"nbCalorie":200,"bpmMoyen":140,"bpmMin":100,"bpmMax":180,"pourcentageRealise":100,"vitesseExecutionMoyenne":10,"description":"my super training termine, pas facile","client":{"id":4},"training":{"id":353}})

};

let getTraining = function (id, callback){
    request(optionsGetTraining, function (error, response) {
        if (error) throw new Error(error);
        //console.log(response.body);
        let trainings = JSON.parse(response.body.toString());
        for (let i = 0; i < trainings.length; i++) {
            let training = trainings[i];
            if(training.id == id){
                callback(training);
            }
        }
    });
}


let postTrainingReport = function (body, eventEmitter){
    console.log("postTrainingReport");
    optionsPostReport.body = body;
    request(optionsPostReport, function (error, response) {
        if (error) throw new Error(error);
        if(eventEmitter)
            eventEmitter.emit('end-training-ok');
        console.log(response.body);

    });

}




module.exports = {
    getTraining : getTraining,
    postTrainingReport : postTrainingReport
};
