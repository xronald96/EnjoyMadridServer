let AWS = require('aws-sdk');
let express = require('express');
AWS.config.update({
 "region": "eu-west-1",
 "accessKeyId": "AKIA3TCNS7CKI22CSR5I",
 "secretAccessKey": "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"
});

let docClient = new AWS.DynamoDB.DocumentClient();
let table = "Relaciones";

const getAllRRPPs = function(companyName){ // Obtiene Todos los RRPPs de una compañia
    let params = {
        TableName: table,
        KeyConditionExpression: "#companyName = :companyName",
        ExpressionAttributeNames:{
            "#companyName": "companyName"
        },
        ExpressionAttributeValues: {
            ":companyName": '1'
        }
    };
    docClient.query(params, (err, data) =>{
        if (err) {
             console.log(err);
        } else {
            console.log('resultado', data.Item, data);
        }
    } )
    // docClient.get(params, function (err, data) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log('resultado', data.Item, data);
    //     }
    // });
};

module.exports.getAllRRPPs = getAllRRPPs;