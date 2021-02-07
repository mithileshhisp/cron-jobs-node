const cron = require("node-cron");
const express = require("express");
const fs = require("fs");
const constant = require("./constant");
const log4js = require('log4js');
const cova_aggregate = require('./covaaggregate');

//app = express();
// Initialise
let app = express();

/*
cron.schedule("* * * * *", function() {
      console.log("running a task every minute");
    });
*/
    cron.schedule('49 17 * * *', function() {
        console.log('Hello World!');
        new cova_aggregate();

    });


//app.listen(3128);
	
//app.listen(3000, function() { console.log('Server is online'); });
// include log4js
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

//const xyzLog = log4js.getLogger('importLogFile');
//xyzLog.info('Hello!');
//xyzLog.debug( 'DEBUG');
//xyzLog.error( 'ERROR' );