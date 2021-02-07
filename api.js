const request = require('request');
//const request = require('request');
const syncRequest = require('sync-request');

exports.postReq = function(url,data,auth,callback) {
    request({
        url: url,
        method: "POST",
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

exports.getRequest = function(url,auth,callback) {

    request({
        url: url,
        method: "GET",
        async: false,
        headers: {
            "Authorization": auth
        }
    }, function (error, response, body) {

        callback(error,response,body);

    });
}

exports.postCOVARequest = function(url,data,callback) {
    syncRequest({
        url: url,
        method: "POST",
        async: false,
        json: true,   // <--Very important!!!
        body: data,
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI0NiIsInVzZXJ0eXBlIjoiMSIsInRzIjoiNDQ0IiwiZXhwIjoxNjI1OTg3MjAyLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjYzODg0IiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo2Mzg4NCJ9.Hz8C5U-yW2guwMYegISGtUPQ0OEcdpNxFwcOgOSvWh0'
        }
    }, function (error, response, body) {
        callback(error,response,body);
    });
}

/*

npm install sync-request
request(method, url, options);
var request = require('sync-request');
var res = request('GET', 'https://example.com', {
  headers: {
    'user-agent': 'example-user-agent',
  },
});
console.log(res.getBody());

var request = require('sync-request');
var res = request('GET', 'http://example.com');
console.log(res.getBody());

POST request to a JSON endpoint
var request = require('sync-request');
var res = request('POST', 'https://example.com/create-user', {
  json: {username: 'ForbesLindesay'},
});
var user = JSON.parse(res.getBody('utf8'));


*/



