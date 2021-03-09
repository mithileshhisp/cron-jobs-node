
var request = require('request');

exports.postReq = function(url,data,auth,callback) {
    request({
        url: url,
        method: "POST",
        async: false,
        json: true,   // <--Very important!!!
        body: data,
        headers: {
            "authorization": auth,
            "content-Type": "application/json",
        }
    }, function (error, response, body) {
        callback(error,response,body);
    });
}

exports.postReqw = function(url,data,callback) {
    request({
        url: url,
        method: "POST",
        async: false,
        json: true,   // <--Very important!!!
        body: data,
        // headers: {
        //     'Authorization': '',
        //     'Content-Type': 'application/json',
        //     'Cookie': ''
        // }
    }, function (error, response, body) {
        callback(error,response,body);
    });
}

exports.putReq = function(url,data,auth,callback) {
    request({
        url: url,
        method: "PUT",
        json: true,   // <--Very important!!!
        body: data,
        headers: {
            "Authorization": auth,
            "Content-Type": "application/json",
        }
    }, function (error, response, body) {
        callback(error,response,body);
    });
}

exports.getReq = function(url,auth,callback) {
    
    request({
        url: url,
        method: "GET",
        headers: {
            "Authorization": auth
        }
    }, function (error, response, body) {
	
        callback(error,response,body);

    });
}


exports.postReqWithoutAuth = function(url,pbody,callback){
    request({
        url: url,
        formData: pbody,
        method: "POST"
    }, function (error, response, body){
        callback(error,response,body);
    });
}



