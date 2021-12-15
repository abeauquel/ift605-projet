const request = require('request');
const turnOnLight = {
    'method': 'POST',
    'url': 'http://localhost:8123/api/services/light/turn_on\n',
    'headers': {
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIxMjFlZDBkMWNhMGQ0NjcyYTgzMDFlZTMzYmNjMDJmOCIsImlhdCI6MTYzODgyNjg1OSwiZXhwIjoxOTU0MTg2ODU5fQ.JwWYyr8tigrXmyeQymQnOdBoQ_-UkrmSaHj-0LpPtBY'

    },
    body : '{"entity_id":"light.enbrighten_60w_dimmable_light_bulb"}'
};
const turnOffLight = {
    'method': 'POST',
    'url': 'http://localhost:8123/api/services/light/turn_off\n',
    'headers': {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIxMjFlZDBkMWNhMGQ0NjcyYTgzMDFlZTMzYmNjMDJmOCIsImlhdCI6MTYzODgyNjg1OSwiZXhwIjoxOTU0MTg2ODU5fQ.JwWYyr8tigrXmyeQymQnOdBoQ_-UkrmSaHj-0LpPtBY'
    },
    body: '{"entity_id":"light.enbrighten_60w_dimmable_light_bulb"}'
};

let callTurnOnLight = function (){
    request(turnOnLight, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
    });
}

let callTurnOffLight = function (){
    request(turnOffLight, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
    });
}




module.exports = {
    callTurnOffLight : callTurnOffLight,
    callTurnOnLight : callTurnOnLight
};
