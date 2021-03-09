
exports.DHIS_URL_BASE = "https://links.hispindia.org/covid";
// exports.DHIS_URL_BASE = "http://172.16.13.158:8080/dhis34";
exports.TEI_API = "/api/trackedEntityInstances/";

exports.username = "";
exports.password = "";
exports.auth = "Basic " + new Buffer(exports.username + ":" + exports.password).toString("base64");
exports.covaauth = " ";

var request = require('request');
var options = {
    'method': 'POST',
    'url': 'https://cova.punjab.gov.in/api/cova/users/auth/v1/fetch-idsp-all-data-external',
    'headers': {
        'Authorization': ' ',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"district_Id":"","start_date":"2020-11-01","end_date":"2020-11-08"})

};
request(options, function (error, response) {
    if (error) throw new Error(error);

});
exports.tetype_person="MCPQUTHX1Ze";
exports.covid19_cbs="uYjxkTbwRNf";
exports.stage1_clinical_examination="LpWNjNGvCO5";
exports.stage2_lab_request="iR8O4hSLHnu";
exports.stage3_labresults="dDHkBd3X8Ce";
exports.stage4_healthoutcome="iVfs6Jyp7I8";
