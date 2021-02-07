# cron-jobs-node

for api integration of punjab-cova to dhis2 version-2.34 using node-cron-jobs

# Installation

npm install

// for moment, moment-range
npm install moment
npm install moment-range
// for api request
npm install request
//for logs
npm install log4js

//how to use
const log4js = require('log4js');
log4js.configure({
    appenders: {
        outPut: { type: 'stdout' },
        aFile: { type: 'multiFile', base: 'logs/', property: 'categoryName', extension: '.log' }
    },
    categories: {
        default: { appenders: ['outPut'], level: 'info' },
        importLogFile: { appenders: ['aFile'], level: 'debug' }
    }
});

const xyzLog = log4js.getLogger('importLogFile');
xyzLog.info('Hello!');
xyzLog.debug( 'DEBUG');
xyzLog.error( 'ERROR' );

// referance link is -- 
https://www.npmjs.com/package/log4js?activeTab=readme

// for sync call
npm install sync-request
//how to use

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

// referance link
https://www.npmjs.com/package/sync-request

# for start schedule
// change in index.js file for time then
 
node index.js 



