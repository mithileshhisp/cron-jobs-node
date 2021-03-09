module.exports = pun_covid;

var constant = require("./CONSTANTS");
var ajax = require("./ajax");
var moment = require("moment");
var MomentRange = require('moment-range');
moment = MomentRange.extendMoment(moment);


function pun_covid() {
    var dataElementsCodeMap = [];
    var all_orgunits = [];
    var today = new Date();
    var s_today = new Date();
    var e_today = new Date();
    s_today.setFullYear(2020);
    s_today.setDate(1);
    s_today.setMonth(10);
    e_today.setFullYear(2020);
    e_today.setDate(8);
    e_today.setMonth(10);


    // while (s_today<today)
    for (s_today; s_today < today; s_today.setDate(s_today.getDate() + 7)) {
        init();

        function init() {
            getOUs(function (ous) {
                getDEs(function (des) {
                    all_orgunits = ous.organisationUnits;

                })
            })
            transfer();

        }


        function transfer() {
            var request = require('request');
            var options = {
                'method': 'POST',
                'url': 'https://cova.punjab.gov.in/api/cova/users/auth/v1/fetch-idsp-all-data-external',
                'headers': {
                    'Authorization': 'Bearer ',
                    'Content-Type': 'application/json'
                },
                //609,28,33,39,40,43,608,42,41,662,38,37,651,30,29,605,27,35,36,32,31,34
                body: JSON.stringify({
                    "district_Id": "",
                    "start_date": s_today.toJSON().substring(0, 10),
                    "end_date": e_today.toJSON().substring(0, 10)
                })

            };
            request(options, function (error, response) {
                if (error) throw new Error(error);
                // console.log("cova--r",response);
                var body_data = response.body;

                var objToJson = {};
                objToJson.response = body_data;
                var cova_data = JSON.parse(response.body);
                if(cova_data.data!=null)
                {
                    for (var i = 0; i < cova_data.data.length; i++) {

                        for (var j = 0; j < all_orgunits.length; j++) {

                            if (cova_data.data[i].patient_sub_district_id == all_orgunits[j].code) {
                                var teienroll = {
                                    "trackedEntityType": constant.tetype_person,
                                    "orgUnit": all_orgunits[j].id,
                                    "attributes": [
                                        {
                                            "attribute": "zovPpwEdjkO",
                                            "value": cova_data.data[i].idsp_id
                                        },
                                        {
                                            "attribute": "sB1IHYu2xQT",
                                            "value": cova_data.data[i].patient_name
                                        },
                                        {
                                            "attribute": "oindugucx72",
                                            "value": cova_data.data[i].patient_sex
                                        },
                                        {
                                            "attribute": "fctSQp5nAYl",
                                            "value": cova_data.data[i].patient_mobile
                                        },
                                        {
                                            "attribute": "Rv8WM2mTuS5",
                                            "value": cova_data.data[i].patient_age
                                        },
                                        {
                                            "attribute": "Xhdn49gUd52",
                                            "value": cova_data.data[i].patient_address
                                        },
                                        {
                                            "attribute": "WHZjGqOLDZK",
                                            "value": cova_data.data[i].patient_occupation
                                        },
                                        {
                                            "attribute": "doXv8QTb5kJ",
                                            "value": cova_data.data[i].id_type_name
                                        },
                                        {
                                            "attribute": "jxiqNSlTC6x",
                                            "value": cova_data.data[i].number
                                        },
                                        {
                                            "attribute": "oSlRezClT5F",
                                            "value": cova_data.data[i].icmr_category
                                        },
                                        {
                                            "attribute": "wCvMsiZFGmN",
                                            "value": cova_data.data[i].type_case_name
                                        },
                                        {
                                            "attribute": "he05i8FUwu3",
                                            "value": cova_data.data[i].icmr_Id
                                        },
                                        {
                                            "attribute": "KwY0phpRvCx",
                                            "value": cova_data.data[i].patient_Id
                                        },
                                        {
                                            "attribute": "C8hLD2XSExU",
                                            "value": cova_data.data[i].patient_region
                                        },
                                    ],

                                    "enrollments": [{
                                        "orgUnit": all_orgunits[j].id,
                                        "program": constant.covid19_cbs,
                                        "status": "ACTIVE",
                                        "enrollmentDate": cova_data.data[i].date_sample_collection,
                                        "incidentDate": cova_data.data[i].date_sample_collection,
                                        "events": [
                                            {
                                                "program": constant.covid19_cbs,
                                                "orgUnit": all_orgunits[j].id,
                                                "eventDate": cova_data.data[i].date_sample_collection,
                                                "status": "ACTIVE",
                                                "storedBy": "admin",
                                                "programStage": constant.stage1_clinical_examination,
                                                "dataValues": [
                                                    {
                                                        "dataElement": "F00gHNdSerM",
                                                        "value": cova_data.data[i].institutional_level_name
                                                    },
                                                    {
                                                        "dataElement": "nUEmcgo2s0F",
                                                        "value": cova_data.data[i].type_isolation_name
                                                    },
                                                    {
                                                        "dataElement": "s3eoonJ8OJb",
                                                        "value": cova_data.data[i].date_onset_symptoms
                                                    },
                                                    {
                                                        "dataElement": "yQ1kBrpWHMI",
                                                        "value": cova_data.data[i].date_isolation
                                                    },
                                                    {
                                                        "dataElement": "TzqawmlPkI5",
                                                        "value": cova_data.data[i].travel_history
                                                    },
                                                    {
                                                        "dataElement": "oomj0HzoQB5",
                                                        "value": cova_data.data[i].country_state_name
                                                    },
                                                    {
                                                        "dataElement": "GNqZXPAdTgt",
                                                        "value": cova_data.data[i].date_of_return
                                                    },
                                                    {
                                                        "dataElement": "waOx3rpZgWB",
                                                        "value": cova_data.data[i].traceable
                                                    },
                                                    {
                                                        "dataElement": "xiFdLurDGVA",
                                                        "value": cova_data.data[i].institutional_type_name
                                                    },
                                                    {
                                                        "dataElement": "NQj9PyJvBvN",
                                                        "value": cova_data.data[i].bed_type_name
                                                    },
                                                    {
                                                        "dataElement": "IBh50aopjrH",
                                                        "value": cova_data.data[i].time_of_isolation_name
                                                    }
                                                ]
                                            },
                                            {
                                                "program": constant.covid19_cbs,
                                                "orgUnit": all_orgunits[j].id,
                                                "eventDate": cova_data.data[i].date_sample_collection,
                                                "status": "ACTIVE",
                                                "storedBy": "admin",
                                                "programStage": constant.stage2_lab_request,
                                                "dataValues": [
                                                    {
                                                        "dataElement": "FSzpeQS2e2g",
                                                        "value": cova_data.data[i].lab_type_name
                                                    },
                                                    {
                                                        "dataElement": "Q98LhagGLFj",
                                                        "value": cova_data.data[i].date_sample_collection
                                                    },
                                                    {
                                                        "dataElement": "D0RBm3alWd9",
                                                        "value": cova_data.data[i].test_type_name
                                                    }]
                                            },
                                            {
                                                "program": constant.covid19_cbs,
                                                "orgUnit": all_orgunits[j].id,
                                                "eventDate": cova_data.data[i].date_tested_positive,
                                                "status": "ACTIVE",
                                                "storedBy": "admin",
                                                "programStage": constant.stage3_labresults,
                                                "dataValues": [
                                                    {
                                                        "dataElement": "tYzF5meCFFv",
                                                        "value": cova_data.data[i].date_tested_positive
                                                    }]
                                            },
                                            {
                                                "program": constant.covid19_cbs,
                                                "orgUnit": all_orgunits[j].id,
                                                "eventDate": cova_data.data[i].date_outcome,
                                                "status": "ACTIVE",
                                                "storedBy": "admin",
                                                "programStage": constant.stage4_healthoutcome,
                                                "dataValues": [
                                                    {
                                                        "dataElement": "bOYWVEBaWy6",
                                                        "value": cova_data.data[i].outcome_name
                                                    }]
                                            }
                                        ]
                                    }
                                    ]
                                }


                                ajax.postReqw(constant.DHIS_URL_BASE + constant.TEI_API, teienroll, function (error, response, body) {
                                    if (error) {
                                        __logger.error("Error with datavalue post" + error)
                                        return;
                                    }
                                    __logger.info(body.status + " " + JSON.stringify(body));
                                    __logger.info(body.status + " " + JSON.stringify(body.importCount));

                                })




                            }
                        }
                    }
                }



            });

        }

        e_today.setDate(e_today.getDate() + 7);

    }


    function getDEs(callback) {
        ajax.getReq(constant.DHIS_URL_BASE + "/api/dataElements?fields=id,name,code&paging=false", constant.auth, function (error, response, body) {

            if (error) {
                __logger.error("De Error" + response);
                callback(null)
                return;
            }
            var des = JSON.parse(body).dataElements;

            for (var i = 0; i < des.length; i++) {

                dataElementsCodeMap[des[i].name] = des[i].name;
            }
            callback(JSON.parse(body));

        })
    }

    function getOUs(callback) {
        ajax.getReq(constant.DHIS_URL_BASE + "/api/organisationUnits?fields=id,name,code,level&filter=level:in:[3,4]&paging=false", constant.auth, function (error, response, body) {

            if (error) {
                __logger.error("OU Error" + response);
                callback(null)
                return;
            }

            callback(JSON.parse(body));

        })
    }
}
