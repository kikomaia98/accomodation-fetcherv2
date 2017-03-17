//Perform cURL rquest
var errf = false;
var request = require('request');
var headers = {
    'Origin': 'http://uk.urbanest.com',
    'Accept-Encoding': 'gzip, deflate, br',
    'Content-Type': 'application/json;charset=UTF-8',
    'Accept': 'application/json, text/plain, */*',
    'Referer': 'http://uk.urbanest.com/uk/london/availability-ajax.html',
    'Connection': 'keep-alive'
};

var dataString = '{"criteria":{"priceRangeLow":100,"priceRangeHigh":600,"roomType":["EN_10PPL","EN_10PPL_PG","EN_10PPL_UG","EN_11PPL","EN_11PPL_PG","EN_11PPL_UG","ENS_12PPL","ENS_13PPL","EN_14PPL","ENS_15PPL","SINGLE_2PPL","Sngl_Ens_4Bd","Sngl_Ens_5Bd","Sngl_Ens_5Bd_PG","Sngl_Ens_5Bd_UG","ENS_6PPL","ENS_6PPL_PG","ENS_6PPL_UG","EN_7PPL","EN_7PPL_UG","Sngl_Ens_8Bd","Sngl_Ens_8Bd_PG","Sngl_Ens_8Bd_UG","ENS_9PPL"],"location":["WBSA"],"availability":["TB_51_17-18","St Pancras RU-DL 17-18","HOX_1718_51","STP_51_17-18","WB1718_51_17-18","KX_51_17-18","WB1516_51_17-18","WB1314_51_17-18","WB1112_51_17-18"]}}';

var options = {
    url: 'https://cms.urbanest.co.uk/json-interface/rs/webService/searchAvailability',
    method: 'POST',
    headers: headers,
    body: dataString
};
var Pushover = require('node-pushover');
var push = new Pushover({
    token: "aqokpf8o3p8xsqz1ghm52z71nn28e6",
    user: "uhky9nc8x4y81ivc52u4zmicnouzh8"
});
//main function
function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
   if (body.indexOf('"bookable":true') >= 0) {
    push.send("[RESULT] Urbanest Spider", "Ensuite found MOVE QUICK!",function (err, res){
    if(err){
        console.log("We have an error:");
        console.log(err);
        console.log(err.stack);
    }else{
        console.log("Message send successfully");
        console.log(res);
    }
}, true);
    } else {
             push.send("[Running] Urbanest Spider", "Running As usual code from body - "+body.substr(1, 13),function (err, res){
    if(err){
        console.log("We have an error:");
        console.log(err);
        console.log(err.stack);
    }else{
        console.log("Message send successfully");
        console.log(res);
    }
}, false);
    }
        }
}


request(options, callback);
