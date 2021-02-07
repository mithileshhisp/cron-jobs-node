module.exports =  cova_aggregate;

const log4js = require('log4js');
const postRequest = require('sync-request');
const moment = require("moment");
const api = require("./api");
const MomentRange = require('moment-range');
const constant = require("./constant");
const importLog = log4js.getLogger('importLogFile');
function cova_aggregate(){

// Initialise

    initialise();

    function initialise() {
        let finalOu = [];
        let orgUnitMap = [];
        //let dataElementsMapping = [];
        let dataValues = [];
        //let dataValueSet = {dataValues:[]};
        let currentDate = new Date();
        let todayDate = moment(currentDate).format('YYYY-MM-DD');
        //let todayDate = '2021-02-06';
        let isoPeriod = todayDate.split("-")[0] + todayDate.split("-")[1] + todayDate.split("-")[2];
        console.log('todayDate -- ', todayDate);
        //console.log('COVA API -- ', constant.punjabCOVAURL);
        importLog.info('import process start for date --', todayDate, 'period -- ', isoPeriod);
        //getOrgUnits( );
        getOrgUnits(function (orgUnitResponse) {
            for (let z = 0; z < orgUnitResponse.organisationUnits.length; z++) {
                finalOu.push({
                    'id': orgUnitResponse.organisationUnits[z].id,
                    'name': orgUnitResponse.organisationUnits[z].name,
                    'code': orgUnitResponse.organisationUnits[z].code
                });
                orgUnitMap[orgUnitResponse.organisationUnits[z].code] = orgUnitResponse.organisationUnits[z].id;
            }
            console.log('ou length -- ', finalOu.length);
            //cOVAAggregatePostApi( finalOu, orgUnitMap, todayDate, isoPeriod );
            let dataElementsMapping = constant.dataElementsMapping;
            for (let j = 0; j < finalOu.length; j++) {
                //console.log('dataValues -- ', dataValues);
                let postDataJson = {
                    "punjab_lgd_district_Id": finalOu[j].code,
                    "search_type": "D",
                    "start_date1": todayDate,
                    "dist_date": todayDate,
                    "type_of_area": ""
                }

                //api.postCOVARequest( constant.punjabCOVAURL, postDataJson ,function (error, response, body) {
                //     if (error) {
                //         //__logger.error(error);
                //         //console.log('ou length -- ', postDataJson);
                //         return;
                //     }

                    let postResponse = postRequest('POST', constant.punjabCOVAURL, {
                        headers: {
                            'Authorization': 'Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI0NiIsInVzZXJ0eXBlIjoiMSIsInRzIjoiNDQ0IiwiZXhwIjoxNjI1OTg3MjAyLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjYzODg0IiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo2Mzg4NCJ9.Hz8C5U-yW2guwMYegISGtUPQ0OEcdpNxFwcOgOSvWh0'
                        },
                        json: postDataJson,
                    });
                    //var user = JSON.parse(res.getBody('utf8'));
                    let apiResponse = JSON.parse(postResponse.getBody('utf8'));

                    //__logger.info(response.statusCode);
                    //cOVAAggregateImport(response.body, orgUnitMap, isoPeriod, dataValues );
                    //let apiResponse = response.body;
                    //console.log( postDataJson , ' apiResponse -- ', apiResponse );
                    if( apiResponse.response !== 0 && apiResponse.data !== null ){
                        //let dataElementsMapping = constant.dataElementsMapping;
                        for (let i = 0; i < apiResponse.data.length; i++) {
                            for (let k = 0; k < dataElementsMapping.length; k++) {
                                let dataValue = {};
                                if(dataElementsMapping[k].name === "sample_RTPCR_govt" )
                                {
                                    dataValue.period = isoPeriod;
                                    dataValue.dataElement = dataElementsMapping[k].id;
                                    dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                                    dataValue.orgUnit = finalOu[j].id;
                                    dataValue.value = apiResponse.data[i].sample_RTPCR_govt;
                                    dataValues.push(dataValue);
                                }
                                else if(dataElementsMapping[k].name === "sample_RTPCR_private" )
                                {
                                    dataValue.period = isoPeriod;
                                    dataValue.dataElement = dataElementsMapping[k].id;
                                    dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                                    dataValue.orgUnit = finalOu[j].id;
                                    dataValue.value = apiResponse.data[i].sample_RTPCR_private;
                                    dataValues.push(dataValue);
                                }
                                else if(dataElementsMapping[k].name === "sample_rapid_antigen_test_govt" )
                                {
                                    dataValue.period = isoPeriod;
                                    dataValue.dataElement = dataElementsMapping[k].id;
                                    dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                                    dataValue.orgUnit = finalOu[j].id;
                                    dataValue.value = apiResponse.data[i].sample_rapid_antigen_test_govt;
                                    dataValues.push(dataValue);
                                }
                                else if(dataElementsMapping[k].name === "sample_rapid_antigen_test_private" )
                                {
                                    dataValue.period = isoPeriod;
                                    dataValue.dataElement = dataElementsMapping[k].id;
                                    dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                                    dataValue.orgUnit = finalOu[j].id;
                                    dataValue.value = apiResponse.data[i].sample_rapid_antigen_test_private;
                                    dataValues.push(dataValue);
                                }
                                else if( dataElementsMapping[k].name === "sample_trunat_cbnat_govt" )
                                {
                                    dataValue.period = isoPeriod;
                                    dataValue.dataElement = dataElementsMapping[k].id;
                                    dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                                    dataValue.orgUnit = finalOu[j].id;
                                    dataValue.value = apiResponse.data[i].sample_trunat_cbnat_govt;
                                    dataValues.push(dataValue);
                                }
                                else if(dataElementsMapping[k].name === "sample_trunat_cbnat_private" )
                                {
                                    dataValue.period = isoPeriod;
                                    dataValue.dataElement = dataElementsMapping[k].id;
                                    dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                                    dataValue.orgUnit = finalOu[j].id;
                                    dataValue.value = apiResponse.data[i].sample_trunat_cbnat_private;
                                    dataValues.push(dataValue);
                                }
                                else if(dataElementsMapping[k].name === "tested_RTPCR_govt" )
                                {
                                    dataValue.period = isoPeriod;
                                    dataValue.dataElement = dataElementsMapping[k].id;
                                    dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                                    dataValue.orgUnit = finalOu[j].id;
                                    dataValue.value = apiResponse.data[i].tested_RTPCR_govt;
                                    dataValues.push(dataValue);
                                }
                                else if(dataElementsMapping[k].name === "tested_RTPCR_private" )
                                {
                                    dataValue.period = isoPeriod;
                                    dataValue.dataElement = dataElementsMapping[k].id;
                                    dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                                    dataValue.orgUnit = finalOu[j].id;
                                    dataValue.value = apiResponse.data[i].tested_RTPCR_private;
                                    dataValues.push(dataValue);
                                }
                                else if(dataElementsMapping[k].name === "tested_antigen_test_govt" )
                                {
                                    dataValue.period = isoPeriod;
                                    dataValue.dataElement = dataElementsMapping[k].id;
                                    dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                                    dataValue.orgUnit = finalOu[j].id;
                                    dataValue.value = apiResponse.data[i].tested_antigen_test_govt;
                                    dataValues.push(dataValue);
                                }
                                else if(dataElementsMapping[k].name === "tested_antigen_test_private" )
                                {
                                    dataValue.period = isoPeriod;
                                    dataValue.dataElement = dataElementsMapping[k].id;
                                    dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                                    dataValue.orgUnit = finalOu[j].id;
                                    dataValue.value = apiResponse.data[i].tested_antigen_test_private;
                                    dataValues.push(dataValue);
                                }
                                else if( dataElementsMapping[k].name === "tested_trunat_cbnat_govt" )
                                {
                                    dataValue.period = isoPeriod;
                                    dataValue.dataElement = dataElementsMapping[k].id;
                                    dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                                    dataValue.orgUnit = finalOu[j].id;
                                    dataValue.value = apiResponse.data[i].tested_trunat_cbnat_govt;
                                    dataValues.push(dataValue);
                                }
                                else if(dataElementsMapping[k].name === "tested_trunat_cbnat_private" )
                                {
                                    dataValue.period = isoPeriod;
                                    dataValue.dataElement = dataElementsMapping[k].id;
                                    dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                                    dataValue.orgUnit = finalOu[j].id;
                                    dataValue.value = apiResponse.data[i].tested_trunat_cbnat_private;
                                    dataValues.push(dataValue);
                                }
                                else if(dataElementsMapping[k].name === "positive_RTPCR_govt" )
                                {
                                    dataValue.period = isoPeriod;
                                    dataValue.dataElement = dataElementsMapping[k].id;
                                    dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                                    dataValue.orgUnit = finalOu[j].id;
                                    dataValue.value = apiResponse.data[i].positive_RTPCR_govt;
                                    dataValues.push(dataValue);
                                }
                                else if(dataElementsMapping[k].name === "positive_RTPCR_private" )
                                {
                                    dataValue.period = isoPeriod;
                                    dataValue.dataElement = dataElementsMapping[k].id;
                                    dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                                    dataValue.orgUnit = finalOu[j].id;
                                    dataValue.value = apiResponse.data[i].positive_RTPCR_private;
                                    dataValues.push(dataValue);
                                }
                                else if(dataElementsMapping[k].name === "positive_antigen_test_govt" )
                                {
                                    dataValue.period = isoPeriod;
                                    dataValue.dataElement = dataElementsMapping[k].id;
                                    dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                                    dataValue.orgUnit = finalOu[j].id;
                                    dataValue.value = apiResponse.data[i].positive_antigen_test_govt;
                                    dataValues.push(dataValue);
                                }
                                else if(dataElementsMapping[k].name === "positive_antigen_test_private" )
                                {
                                    dataValue.period = isoPeriod;
                                    dataValue.dataElement = dataElementsMapping[k].id;
                                    dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                                    dataValue.orgUnit = finalOu[j].id;
                                    dataValue.value = apiResponse.data[i].positive_antigen_test_private;
                                    dataValues.push(dataValue);
                                }
                                else if( dataElementsMapping[k].name === "positive_trunat_cbnat_govt" )
                                {
                                    dataValue.period = isoPeriod;
                                    dataValue.dataElement = dataElementsMapping[k].id;
                                    dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                                    dataValue.orgUnit = finalOu[j].id;
                                    dataValue.value = apiResponse.data[i].positive_trunat_cbnat_govt;
                                    dataValues.push(dataValue);
                                }
                                else if(dataElementsMapping[k].name === "positive_trunat_cbnat_private" )
                                {
                                    dataValue.period = isoPeriod;
                                    dataValue.dataElement = dataElementsMapping[k].id;
                                    dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                                    dataValue.orgUnit = finalOu[j].id;
                                    dataValue.value = apiResponse.data[i].positive_trunat_cbnat_private;
                                    dataValues.push(dataValue);
                                }
                            }
                        }
                    }
                    else{
                        //console.log( j + " -- " + finalOu[j].name + "  code -- " + finalOu[j].code + " Api Response --  " + apiResponse.sys_message + "  data -- " + apiResponse.data  );

                    }
                    /*
                    if( j+1 === finalOu.length ){
                        let dataValueSet = {};
                        dataValueSet.dataValues = dataValues;
                        console.log(" j : " + j, " finalOu.length : " + finalOu.length )
                        console.log(" final dataValueSet size: " + dataValueSet.dataValues.length )
                    }
                    */
                    //debugger
                //});
                /*
                if( j+1 === finalOu.length ){
                    //let dataValueSet = {};
                    //dataValueSet.dataValues = dataValues;
                    console.log(" j : " + j, " finalOu.length : " + finalOu.length )
                    console.log(" final dataValueSet size: " + dataValueSet.length )
                }
                */


            }

            let dataValueSet = {};
            dataValueSet.dataValues = dataValues;

            //console.log(  finalOu.length + " final dataValueSet size: " + dataValueSet.dataValues.length );
            //console.log(" final dataValueSet : " + JSON.stringify(dataValueSet) );
            console.log( " final dataValueSet size: " + dataValueSet.dataValues.length );

            importAggregatedData( dataValueSet );

        });

    }

    function importAggregatedData(dataValueSet){
        if (dataValueSet.length === 0){
            return;
        }
        api.postReq(constant.DHIS_URL_BASE+"/api/dataValueSets",dataValueSet,constant.auth,function(error,response,body){
            if(error){
                //__logger.error("Error with datavalue post"+error)
                console.log("Error in post");
                importLog.error( 'Error in post/import' );
                return;
            }

            //__logger.info(" " + JSON.stringify(body.importCount));
            //console.log("response : " + JSON.stringify(response.body));
            //console.log("body : " +JSON.stringify( body ));

            let description   = body.description;
            let impCount = body.importCount.imported;
            let upCount = body.importCount.updated;
            let igCount = body.importCount.ignored;
            let conflictsDetails   = body.conflicts;
            console.log( 'description -- ', description );
            console.log( 'Import-Count -- ', impCount );
            console.log( 'Update-Count -- ', upCount );
            console.log( 'Ignore-Count -- ', igCount );
            console.log( 'conflictsDetails -- ', conflictsDetails );

            importLog.info('description -- ', description );
            importLog.info('Import-Count -- ', impCount, 'Update-Count -- ', upCount , 'Ignore-Count -- ', igCount);
            importLog.info('conflictsDetails -- ', conflictsDetails );


        })
    }


    /*
    function cOVAAggregatePostApi( finalOu, orgUnitMap, todayDate, isoPeriod ){
        let dataValues = [];
        let dataValueSet = {dataValues:[]};
        let dataElementsMapping = constant.dataElementsMapping;
        for (let j = 0; j < finalOu.length; j++) {
            //console.log('dataValues -- ', dataValues);
            let postDataJson = {
                "punjab_lgd_district_Id": finalOu[j].code,
                "search_type": "D",
                "start_date1": todayDate,
                "dist_date": todayDate,
                "type_of_area": ""
            }

            api.postCOVARequest( constant.punjabCOVAURL, postDataJson ,function (error, response, body) {
                if (error) {
                    //__logger.error(error);
                    //console.log('ou length -- ', postDataJson);
                    return;
                }
                //__logger.info(response.statusCode);
                //cOVAAggregateImport(response.body, orgUnitMap, isoPeriod, dataValues );
                let apiResponse = response.body;

                if( apiResponse.response !== 0 && apiResponse.data !== null ){
                    //let dataElementsMapping = constant.dataElementsMapping;
                    for (let i = 0; i < apiResponse.data.length; i++) {
                        for (let k = 0; k < dataElementsMapping.length; k++) {
                            let dataValue = {};
                            if(dataElementsMapping[k].name === "sample_RTPCR_govt" )
                            {
                                dataValue.period = isoPeriod;
                                dataValue.dataElement = dataElementsMapping[k].id;
                                dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                                dataValue.orgUnit = orgUnitMap[apiResponse.data[i].punjab_lgd_district_Id];
                                dataValue.value = apiResponse.data[i].sample_RTPCR_govt;
                                dataValues.push(dataValue);
                                dataValueSet.dataValues.push(dataValue);
                            }
                            else if(dataElementsMapping[k].name === "sample_RTPCR_private" )
                            {
                                dataValue.period = isoPeriod;
                                dataValue.dataElement = dataElementsMapping[k].id;
                                dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                                dataValue.orgUnit = orgUnitMap[apiResponse.data[i].punjab_lgd_district_Id];
                                dataValue.value = apiResponse.data[i].sample_RTPCR_private;
                                dataValues.push(dataValue);
                                dataValueSet.dataValues.push(dataValue);
                            }
                            else if(dataElementsMapping[k].name === "sample_rapid_antigen_test_govt" )
                            {
                                dataValue.period = isoPeriod;
                                dataValue.dataElement = dataElementsMapping[k].id;
                                dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                                dataValue.orgUnit = orgUnitMap[apiResponse.data[i].punjab_lgd_district_Id];
                                dataValue.value = apiResponse.data[i].sample_rapid_antigen_test_govt;
                                dataValues.push(dataValue);
                                dataValueSet.dataValues.push(dataValue);
                            }
                            else if(dataElementsMapping[k].name === "sample_rapid_antigen_test_private" )
                            {
                                dataValue.period = isoPeriod;
                                dataValue.dataElement = dataElementsMapping[k].id;
                                dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                                dataValue.orgUnit = orgUnitMap[apiResponse.data[i].punjab_lgd_district_Id];
                                dataValue.value = apiResponse.data[i].sample_rapid_antigen_test_private;
                                dataValues.push(dataValue);
                                dataValueSet.dataValues.push(dataValue);
                            }
                            else if( dataElementsMapping[k].name === "sample_trunat_cbnat_govt" )
                            {
                                dataValue.period = isoPeriod;
                                dataValue.dataElement = dataElementsMapping[k].id;
                                dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                                dataValue.orgUnit = orgUnitMap[apiResponse.data[i].punjab_lgd_district_Id];
                                dataValue.value = apiResponse.data[i].sample_trunat_cbnat_govt;
                                dataValues.push(dataValue);
                                dataValueSet.dataValues.push(dataValue);
                            }
                            else if(dataElementsMapping[k].name === "sample_trunat_cbnat_private" )
                            {
                                dataValue.period = isoPeriod;
                                dataValue.dataElement = dataElementsMapping[k].id;
                                dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                                dataValue.orgUnit =orgUnitMap[apiResponse.data[i].punjab_lgd_district_Id];
                                dataValue.value = apiResponse.data[i].sample_trunat_cbnat_private;
                                dataValues.push(dataValue);
                                dataValueSet.dataValues.push(dataValue);
                            }
                            else if(dataElementsMapping[k].name === "tested_RTPCR_govt" )
                            {
                                dataValue.period = isoPeriod;
                                dataValue.dataElement = dataElementsMapping[k].id;
                                dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                                dataValue.orgUnit = orgUnitMap[apiResponse.data[i].punjab_lgd_district_Id];
                                dataValue.value = apiResponse.data[i].tested_RTPCR_govt;
                                dataValues.push(dataValue);
                                dataValueSet.dataValues.push(dataValue);
                            }
                            else if(dataElementsMapping[k].name === "tested_RTPCR_private" )
                            {
                                dataValue.period = isoPeriod;
                                dataValue.dataElement = dataElementsMapping[k].id;
                                dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                                dataValue.orgUnit = orgUnitMap[apiResponse.data[i].punjab_lgd_district_Id];
                                dataValue.value = apiResponse.data[i].tested_RTPCR_private;
                                dataValues.push(dataValue);
                                dataValueSet.dataValues.push(dataValue);
                            }
                            else if(dataElementsMapping[k].name === "tested_antigen_test_govt" )
                            {
                                dataValue.period = isoPeriod;
                                dataValue.dataElement = dataElementsMapping[k].id;
                                dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                                dataValue.orgUnit = orgUnitMap[apiResponse.data[i].punjab_lgd_district_Id];
                                dataValue.value = apiResponse.data[i].tested_antigen_test_govt;
                                dataValues.push(dataValue);
                                dataValueSet.dataValues.push(dataValue);
                            }
                            else if(dataElementsMapping[k].name === "tested_antigen_test_private" )
                            {
                                dataValue.period = isoPeriod;
                                dataValue.dataElement = dataElementsMapping[k].id;
                                dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                                dataValue.orgUnit = orgUnitMap[apiResponse.data[i].punjab_lgd_district_Id];
                                dataValue.value = apiResponse.data[i].tested_antigen_test_private;
                                dataValues.push(dataValue);
                                dataValueSet.dataValues.push(dataValue);
                            }
                            else if( dataElementsMapping[k].name === "tested_trunat_cbnat_govt" )
                            {
                                dataValue.period = isoPeriod;
                                dataValue.dataElement = dataElementsMapping[k].id;
                                dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                                dataValue.orgUnit = orgUnitMap[apiResponse.data[i].punjab_lgd_district_Id];
                                dataValue.value = apiResponse.data[i].tested_trunat_cbnat_govt;
                                dataValues.push(dataValue);
                                dataValueSet.dataValues.push(dataValue);
                            }
                            else if(dataElementsMapping[k].name === "tested_trunat_cbnat_private" )
                            {
                                dataValue.period = isoPeriod;
                                dataValue.dataElement = dataElementsMapping[k].id;
                                dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                                dataValue.orgUnit = orgUnitMap[apiResponse.data[i].punjab_lgd_district_Id];
                                dataValue.value = apiResponse.data[i].tested_trunat_cbnat_private;
                                dataValues.push(dataValue);
                                dataValueSet.dataValues.push(dataValue);
                            }
                            else if(dataElementsMapping[k].name === "positive_RTPCR_govt" )
                            {
                                dataValue.period = isoPeriod;
                                dataValue.dataElement = dataElementsMapping[k].id;
                                dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                                dataValue.orgUnit = orgUnitMap[apiResponse.data[i].punjab_lgd_district_Id];
                                dataValue.value = apiResponse.data[i].positive_RTPCR_govt;
                                dataValues.push(dataValue);
                                dataValueSet.dataValues.push(dataValue);
                            }
                            else if(dataElementsMapping[k].name === "positive_RTPCR_private" )
                            {
                                dataValue.period = isoPeriod;
                                dataValue.dataElement = dataElementsMapping[k].id;
                                dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                                dataValue.orgUnit = orgUnitMap[apiResponse.data[i].punjab_lgd_district_Id];
                                dataValue.value = apiResponse.data[i].positive_RTPCR_private;
                                dataValues.push(dataValue);
                                dataValueSet.dataValues.push(dataValue);
                            }
                            else if(dataElementsMapping[k].name === "positive_antigen_test_govt" )
                            {
                                dataValue.period = isoPeriod;
                                dataValue.dataElement = dataElementsMapping[k].id;
                                dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                                dataValue.orgUnit = orgUnitMap[apiResponse.data[i].punjab_lgd_district_Id];
                                dataValue.value = apiResponse.data[i].positive_antigen_test_govt;
                                dataValues.push(dataValue);
                                dataValueSet.dataValues.push(dataValue);
                            }
                            else if(dataElementsMapping[k].name === "positive_antigen_test_private" )
                            {
                                dataValue.period = isoPeriod;
                                dataValue.dataElement = dataElementsMapping[k].id;
                                dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                                dataValue.orgUnit = orgUnitMap[apiResponse.data[i].punjab_lgd_district_Id];
                                dataValue.value = apiResponse.data[i].positive_antigen_test_private;
                                dataValues.push(dataValue);
                                dataValueSet.dataValues.push(dataValue);
                            }
                            else if( dataElementsMapping[k].name === "positive_trunat_cbnat_govt" )
                            {
                                dataValue.period = isoPeriod;
                                dataValue.dataElement = dataElementsMapping[k].id;
                                dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                                dataValue.orgUnit = orgUnitMap[apiResponse.data[i].punjab_lgd_district_Id];
                                dataValue.value = apiResponse.data[i].positive_trunat_cbnat_govt;
                                dataValues.push(dataValue);
                                dataValueSet.dataValues.push(dataValue);
                            }
                            else if(dataElementsMapping[k].name === "positive_trunat_cbnat_private" )
                            {
                                dataValue.period = isoPeriod;
                                dataValue.dataElement = dataElementsMapping[k].id;
                                dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                                dataValue.orgUnit = orgUnitMap[apiResponse.data[i].punjab_lgd_district_Id];
                                dataValue.value = apiResponse.data[i].positive_trunat_cbnat_private;
                                dataValues.push(dataValue);
                                dataValueSet.dataValues.push(dataValue);
                            }
                        }
                    }
                }
                else{
                    //console.log( j + " -- " + finalOu[j].name + "  code -- " + finalOu[j].code + " Api Response --  " + apiResponse.sys_message + "  data -- " + apiResponse.data  );

                }

                //debugger
            });

        }

    }
   */

/*
    function cOVAAggregateImport(apiResponse, orgUnitMap, isoPeriod, dataValues){
        if( apiResponse.response !== 0 && apiResponse.data !== null ){
            let dataElementsMapping = constant.dataElementsMapping;
            for (let i = 0; i < apiResponse.data.length; i++) {
                for (let k = 0; k < dataElementsMapping.length; k++) {
                    let dataValue = {};
                    if(dataElementsMapping[k].name === "sample_RTPCR_govt" )
                    {
                        dataValue.period = isoPeriod;
                        dataValue.dataElement = dataElementsMapping[k].id;
                        dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                        dataValue.orgUnit = orgUnitMap[apiResponse.data[i].punjab_lgd_district_Id];
                        dataValue.value = apiResponse.data[i].sample_RTPCR_govt;
                        dataValues.push(dataValue);
                    }
                    else if(dataElementsMapping[k].name === "sample_RTPCR_private" )
                    {
                        dataValue.period = isoPeriod;
                        dataValue.dataElement = dataElementsMapping[k].id;
                        dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                        dataValue.orgUnit = orgUnitMap[apiResponse.data[i].punjab_lgd_district_Id];
                        dataValue.value = apiResponse.data[i].sample_RTPCR_private;
                        dataValues.push(dataValue);
                    }
                    else if(dataElementsMapping[k].name === "sample_rapid_antigen_test_govt" )
                    {
                        dataValue.period = isoPeriod;
                        dataValue.dataElement = dataElementsMapping[k].id;
                        dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                        dataValue.orgUnit = orgUnitMap[apiResponse.data[i].punjab_lgd_district_Id];
                        dataValue.value = apiResponse.data[i].sample_rapid_antigen_test_govt;
                        dataValues.push(dataValue);
                    }
                    else if(dataElementsMapping[k].name === "sample_rapid_antigen_test_private" )
                    {
                        dataValue.period = isoPeriod;
                        dataValue.dataElement = dataElementsMapping[k].id;
                        dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                        dataValue.orgUnit = orgUnitMap[apiResponse.data[i].punjab_lgd_district_Id];
                        dataValue.value = apiResponse.data[i].sample_rapid_antigen_test_private;
                        dataValues.push(dataValue);
                    }
                    else if( dataElementsMapping[k].name === "sample_trunat_cbnat_govt" )
                    {
                        dataValue.period = isoPeriod;
                        dataValue.dataElement = dataElementsMapping[k].id;
                        dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                        dataValue.orgUnit = orgUnitMap[apiResponse.data[i].punjab_lgd_district_Id];
                        dataValue.value = apiResponse.data[i].sample_trunat_cbnat_govt;
                        dataValues.push(dataValue);
                    }
                    else if(dataElementsMapping[k].name === "sample_trunat_cbnat_private" )
                    {
                        dataValue.period = isoPeriod;
                        dataValue.dataElement = dataElementsMapping[k].id;
                        dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                        dataValue.orgUnit =orgUnitMap[apiResponse.data[i].punjab_lgd_district_Id];
                        dataValue.value = apiResponse.data[i].sample_trunat_cbnat_private;
                        dataValues.push(dataValue);
                    }
                    else if(dataElementsMapping[k].name === "tested_RTPCR_govt" )
                    {
                        dataValue.period = isoPeriod;
                        dataValue.dataElement = dataElementsMapping[k].id;
                        dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                        dataValue.orgUnit = orgUnitMap[apiResponse.data[i].punjab_lgd_district_Id];
                        dataValue.value = apiResponse.data[i].tested_RTPCR_govt;
                        dataValues.push(dataValue);
                    }
                    else if(dataElementsMapping[k].name === "tested_RTPCR_private" )
                    {
                        dataValue.period = isoPeriod;
                        dataValue.dataElement = dataElementsMapping[k].id;
                        dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                        dataValue.orgUnit = orgUnitMap[apiResponse.data[i].punjab_lgd_district_Id];
                        dataValue.value = apiResponse.data[i].tested_RTPCR_private;
                        dataValues.push(dataValue);
                    }
                    else if(dataElementsMapping[k].name === "tested_antigen_test_govt" )
                    {
                        dataValue.period = isoPeriod;
                        dataValue.dataElement = dataElementsMapping[k].id;
                        dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                        dataValue.orgUnit = orgUnitMap[apiResponse.data[i].punjab_lgd_district_Id];
                        dataValue.value = apiResponse.data[i].tested_antigen_test_govt;
                        dataValues.push(dataValue);
                    }
                    else if(dataElementsMapping[k].name === "tested_antigen_test_private" )
                    {
                        dataValue.period = isoPeriod;
                        dataValue.dataElement = dataElementsMapping[k].id;
                        dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                        dataValue.orgUnit = orgUnitMap[apiResponse.data[i].punjab_lgd_district_Id];
                        dataValue.value = apiResponse.data[i].tested_antigen_test_private;
                        dataValues.push(dataValue);
                    }
                    else if( dataElementsMapping[k].name === "tested_trunat_cbnat_govt" )
                    {
                        dataValue.period = isoPeriod;
                        dataValue.dataElement = dataElementsMapping[k].id;
                        dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                        dataValue.orgUnit = orgUnitMap[apiResponse.data[i].punjab_lgd_district_Id];
                        dataValue.value = apiResponse.data[i].tested_trunat_cbnat_govt;
                        dataValues.push(dataValue);
                    }
                    else if(dataElementsMapping[k].name === "tested_trunat_cbnat_private" )
                    {
                        dataValue.period = isoPeriod;
                        dataValue.dataElement = dataElementsMapping[k].id;
                        dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                        dataValue.orgUnit = orgUnitMap[apiResponse.data[i].punjab_lgd_district_Id];
                        dataValue.value = apiResponse.data[i].tested_trunat_cbnat_private;
                        dataValues.push(dataValue);
                    }
                    else if(dataElementsMapping[k].name === "positive_RTPCR_govt" )
                    {
                        dataValue.period = isoPeriod;
                        dataValue.dataElement = dataElementsMapping[k].id;
                        dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                        dataValue.orgUnit = orgUnitMap[apiResponse.data[i].punjab_lgd_district_Id];
                        dataValue.value = apiResponse.data[i].positive_RTPCR_govt;
                        dataValues.push(dataValue);
                    }
                    else if(dataElementsMapping[k].name === "positive_RTPCR_private" )
                    {
                        dataValue.period = isoPeriod;
                        dataValue.dataElement = dataElementsMapping[k].id;
                        dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                        dataValue.orgUnit = orgUnitMap[apiResponse.data[i].punjab_lgd_district_Id];
                        dataValue.value = apiResponse.data[i].positive_RTPCR_private;
                        dataValues.push(dataValue);
                    }
                    else if(dataElementsMapping[k].name === "positive_antigen_test_govt" )
                    {
                        dataValue.period = isoPeriod;
                        dataValue.dataElement = dataElementsMapping[k].id;
                        dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                        dataValue.orgUnit = orgUnitMap[apiResponse.data[i].punjab_lgd_district_Id];
                        dataValue.value = apiResponse.data[i].positive_antigen_test_govt;
                        dataValues.push(dataValue);
                    }
                    else if(dataElementsMapping[k].name === "positive_antigen_test_private" )
                    {
                        dataValue.period = isoPeriod;
                        dataValue.dataElement = dataElementsMapping[k].id;
                        dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                        dataValue.orgUnit = orgUnitMap[apiResponse.data[i].punjab_lgd_district_Id];
                        dataValue.value = apiResponse.data[i].positive_antigen_test_private;
                        dataValues.push(dataValue);
                    }
                    else if( dataElementsMapping[k].name === "positive_trunat_cbnat_govt" )
                    {
                        dataValue.period = isoPeriod;
                        dataValue.dataElement = dataElementsMapping[k].id;
                        dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                        dataValue.orgUnit = orgUnitMap[apiResponse.data[i].punjab_lgd_district_Id];
                        dataValue.value = apiResponse.data[i].positive_trunat_cbnat_govt;
                        dataValues.push(dataValue);
                    }
                    else if(dataElementsMapping[k].name === "positive_trunat_cbnat_private" )
                    {
                        dataValue.period = isoPeriod;
                        dataValue.dataElement = dataElementsMapping[k].id;
                        dataValue.categoryOptionCombo = dataElementsMapping[k].categorycombo;
                        dataValue.orgUnit = orgUnitMap[apiResponse.data[i].punjab_lgd_district_Id];
                        dataValue.value = apiResponse.data[i].positive_trunat_cbnat_private;
                        dataValues.push(dataValue);
                    }
                }
            }
        }

        //console.log(" final dataValueSet size: " + parseInt(j) )


        //console.log(" final dataValueSet : " + JSON.stringify(dataValueSet) );
        //console.log(" final dataValueSet size: " + dataValueSet.dataValues.length );
    }
*/

    function getOrgUnits(callback){
        api.getRequest(constant.DHIS_URL_BASE+"/api/organisationUnits.json?fields=id,name,code,level,attributeValues[attribute[id,name,code],value]&filter=level:eq:3&sortOrder=ASC&paging=false",constant.auth,function(error,response,body){

            if (error){
                //xyzLog.error("OrgUnit Error" + response);
                callback(null)
                return;
            }
            callback(JSON.parse(body));
            //xyzLog.info("OrgUnit Error" + response );
            //console.log( 'OrgUnit response -- ',  body, " -- " , JSON.parse(body) );
        })
    }



}