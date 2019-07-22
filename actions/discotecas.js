let AWS = require('aws-sdk');
let express = require('express');
var uuid = require('uuid');
AWS.config.update({
 "region": "eu-west-1",
 "accessKeyId": "AKIA3TCNS7CKI22CSR5I",
 "secretAccessKey": "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"
});

let docClient = new AWS.DynamoDB.DocumentClient();
let table = "Discotecas";


function getDiscotecas(){
    return new Promise((resolve, reject) =>{
        var paramsSearch = {
            TableName: table,
        };
        docClient.scan(paramsSearch, function(err, data) {
            if (err) {
                reject("Fallo en el scan de usuarios", JSON.stringify(err));
            } else if (data.Items.length ==  0) { 
                reject("No hay desiones ni discotecas");
            }
            else {
                resolve(data.Items);
            }
        });
    });
}
module.exports = {
    getDiscotecas,
}