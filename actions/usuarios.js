// let AWS = require('aws-sdk');
// let express = require('express');
// var uuid = require('uuid');
// AWS.config.update({
//  "region": "eu-west-1",
//  "accessKeyId": "AKIA3TCNS7CKI22CSR5I",
//  "secretAccessKey": "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"
// });

// let docClient = new AWS.DynamoDB.DocumentClient();
// let table = "Usuarios";

function createUser(objectUser, dbConexion){
    return new Promise((resolve, reject)=>{
        dbConexion.collection('Usuarios').find({email: objectUser.email}).toArray((err, res) =>{
            console.log(res)
            if(err)
                reject("Error crear usuario busqueda Email " + err);
            else if(res.length > 0) {
                reject("Este usuario ya esta dado de alta " + res[0]);
            }
            else {
                dbConexion.collection('Usuarios').insertOne(objectUser, (err, res) => {
                    if(err)
                        reject("Error al insertar usuario " + err);
                    else 
                        resolve(res.ops);
                });
            }
        });
    });
}


//################################ VERSION DYNAMODB       ######################
// function createUser(objectUser){
//     return new Promise((resolve, reject)=>{
//         var paramsSearch = {
//             TableName: "Usuarios",
//             FilterExpression: "#email = :email",
//             ExpressionAttributeNames: {
//                 "#email": "email",
//             },
//             ExpressionAttributeValues: { 
//                 ":email": objectUser.email 
//             }
//         };
//         docClient.scan(paramsSearch, function(err, data) {
//             if (err) {
//                 reject("Fallo en el scan de usuarios", JSON.stringify(err));
//             } else if (data.Items.length > 0) { 
//                 reject("Ya hay un usuario registrado con este correo");
//             }
//             else {
//                 objectUser.id= uuid.v1();
//                 var paramsCreate = {
//                     TableName: "Usuarios",
//                     Item: objectUser,
//                 }
//                 console.log("Intentamos crear", paramsCreate);
//                 docClient.put(paramsCreate).promise().then(data => {
//                     resolve(objectUser);
//                 }).catch(err => {
//                     reject(err)
//                 });
//             }
//         });
//     });
// }

module.exports = {
createUser,
};