exports.DHIS_URL_BASE = "";

exports.username = "";
exports.password = "";
exports.dvdms_user = "";
exports.dvdms_pass = "";

exports.auth = "Basic " + new Buffer(exports.username + ":" + exports.password).toString("base64");
//exports.dvdms_auth = "Basic " + new Buffer(exports.dvdms_user + ":" + exports.dvdms_pass).toString("base64");

exports.punjabCOVAURL = "";

exports.dataElementsMapping = [
    {
        "dhis_name": "Samples Collected",
        "name": "sample_RTPCR_govt",
        "id": "j9zd5z2tjYL",
        "categorycombo": "vZEBy0joAB8"
    },
    {
        "dhis_name": "Samples Collected",
        "name": "sample_RTPCR_private",
        "id": "j9zd5z2tjYL",
        "categorycombo": "wafvmYdVjpZ"
    },
    {
        "dhis_name": "Samples Collected",
        "name": "sample_rapid_antigen_test_govt",
        "id": "j9zd5z2tjYL",
        "categorycombo": "nh0UO7Eabh1"
    },
    {
        "dhis_name": "Samples Collected",
        "name": "sample_rapid_antigen_test_private",
        "id": "j9zd5z2tjYL",
        "categorycombo": "LUMUf1TmrDf"
    },
    {
        "dhis_name": "Samples Collected",
        "name": "sample_trunat_cbnat_govt",
        "id": "j9zd5z2tjYL",
        "categorycombo": "NqvMPfmgrk9"
    },
    {
        "dhis_name": "Samples Collected",
        "name": "sample_trunat_cbnat_private",
        "id": "j9zd5z2tjYL",
        "categorycombo": "zVkPdzaE3di"
    },
    {
        "dhis_name": "Samples Tested",
        "name": "tested_RTPCR_govt",
        "id": "HpdCtyEdMJ7",
        "categorycombo": "vZEBy0joAB8"
    },
    {
        "dhis_name": "Samples Tested",
        "name": "tested_RTPCR_private",
        "id": "HpdCtyEdMJ7",
        "categorycombo": "wafvmYdVjpZ"
    },
    {
        "dhis_name": "Samples Tested",
        "name": "tested_antigen_test_govt",
        "id": "HpdCtyEdMJ7",
        "categorycombo": "nh0UO7Eabh1"
    },
    {
        "dhis_name": "Samples Tested",
        "name": "tested_antigen_test_private",
        "id": "HpdCtyEdMJ7",
        "categorycombo": "LUMUf1TmrDf"
    },
    {
        "dhis_name": "Samples Tested",
        "name": "tested_trunat_cbnat_govt",
        "id": "HpdCtyEdMJ7",
        "categorycombo": "NqvMPfmgrk9"
    },
    {
        "dhis_name": "Samples Tested",
        "name": "tested_trunat_cbnat_private",
        "id": "HpdCtyEdMJ7",
        "categorycombo": "zVkPdzaE3di"
    },
    {
        "dhis_name": "Samples Positive",
        "name": "positive_RTPCR_govt",
        "id": "e4RTlLbj5CU",
        "categorycombo": "vZEBy0joAB8"
    },
    {
        "dhis_name": "Samples Positive",
        "name": "positive_RTPCR_private",
        "id": "e4RTlLbj5CU",
        "categorycombo": "wafvmYdVjpZ"
    },
    {
        "dhis_name": "Samples Positive",
        "name": "positive_antigen_test_govt",
        "id": "e4RTlLbj5CU",
        "categorycombo": "nh0UO7Eabh1"
    },
    {
        "dhis_name": "Samples Positive",
        "name": "positive_antigen_test_private",
        "id": "e4RTlLbj5CU",
        "categorycombo": "LUMUf1TmrDf"
    },
    {
        "dhis_name": "Samples Positive",
        "name": "positive_trunat_cbnat_govt",
        "id": "e4RTlLbj5CU",
        "categorycombo": "NqvMPfmgrk9"
    },
    {
        "dhis_name": "Samples Positive",
        "name": "positive_trunat_cbnat_private",
        "id": "e4RTlLbj5CU",
        "categorycombo": "zVkPdzaE3di"
    }

];



