var constant=require("./CONSTANTS");
var express = require('express');
var forwarder = require('./forwarder');
var pun_covid = require('./pun_covid');

var cron = require('node-cron');

var argv = require('yargs').argv;

cron.schedule("0 0 12 30 * *", function() {
    // new pun_covid();
});



//var rootCas = require('ssl-root-cas/latest').create();
//require('https').globalAgent.options.ca = rootCas;
forwarder = new forwarder();

// Initialise
var app = express();
/**
 * Set up CORS Settings
 */ app.use(function (req, res, next) {

     // Website you wish to allow to connect
     res.setHeader('Access-Control-Allow-Origin', '*');

     // Request methods you wish to allow
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

     // Request headers you wish to allow
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

     // Pass to next layer of middleware
     next();
 });/**
     */
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


/** Set Up Logging
 */ var winston = require('winston');
global.__logger = new (winston.Logger)({
    level : 'silly',
    transports: [
        new (winston.transports.Console)({
            colorize: true,
            timestamp: true
        }),
         new (winston.transports.File)({
             
filename: './logs/server.log',
             timestamp: true
         })
    ]
});


__logger.info("Starting service");






