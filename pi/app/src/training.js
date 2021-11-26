const request = require('request');
const options = {
    'method': 'GET',
    'url': 'http://167.114.144.189:8081/trainings',
    'headers': {}
};

let getTraining = function (id, callback){
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
        let trainings = JSON.parse(response.body.toString());
        for (let i = 0; i < trainings.length; i++) {
            let training = trainings[i];
            if(training.id == id){
                callback(training);
            }
        }
    });
}


module.exports = {
    getTraining : getTraining,
};
