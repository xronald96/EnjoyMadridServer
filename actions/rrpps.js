const express = require('express');
const qrcode = require('qrcode');
const xlsx = require('xlsx');
const nodemailer = require("nodemailer");
var fs = require('fs');
/*
DATOS TESTING CORREO GMAIlL
USER: enjoymadridmad@gmail.com
PASS:  @Testing123
*/

var path = './uploads/';

function newRRPP(objectRRPP, dbConexion){
  return new Promise((resolve, reject) => {
    // convertimos nombre de lista y email a lowerCase para busquedas
    objectRRPP.email = objectRRPP.email.toLowerCase();
    objectRRPP.listName = objectRRPP.listName.toLowerCase();
    dbConexion.collection('Relaciones').find({email: objectRRPP.email}).toArray((err, res) =>{
      if(err) 
        reject(err);
      else if(res.length > 0)
        reject("Ya exite una rrpp con este email o dni");
      else {
        dbConexion.collection('Relaciones').insertOne(objectRRPP, (err, res) => {
          if(err)
            reject(err);
          else{
            let data = objectRRPP.name + '^' + objectRRPP.surname + '^' + objectRRPP.dni; 
            generateQR(data, './uploads/'+data+'.png').then(fullPath => {
              sendEmail(objectRRPP.email, data+'.png', fullPath, objectRRPP.name + ' ' + objectRRPP.surname)
              .then(()=>{
                resolve(res.ops);
              })
              .catch(err => reject('ERROR Email', err));
            }).catch(err => reject("ERROR QR: " ,err));
          }
        });
      }
    });
  });
}

function importRRPPs(dbConexion){
    new Promise((resolve, reject) => {
      fs.readdir(path, (err, files) =>{ // Primera etapa lectura de 
        if(err)
          reject(err);
        else
          resolve(files);
      });
    }).then( files => {
      files = files.filter( x => !x.includes('.png'));
      files.forEach( file => {
        const table = xlsx.readFile(path + '/'+ file);
        const sheet = table.Sheets[table.SheetNames[0]];
        var range = xlsx.utils.decode_range(sheet['!ref']);
        for (let rowNum = range.s.r + 1; rowNum <= range.e.r; rowNum++) { //Segunda fila empezamos
            if(sheet[xlsx.utils.encode_cell({r: rowNum, c: 0})].v &&
            sheet[xlsx.utils.encode_cell({r: rowNum, c: 1})].v &&
            sheet[xlsx.utils.encode_cell({r: rowNum, c: 2})].v &&
            sheet[xlsx.utils.encode_cell({r: rowNum, c: 4})].v ) {
              console.log("Esto es el cumple ", sheet[xlsx.utils.encode_cell({r: rowNum, c: 3})].v)
              let tmpObject = {
                name: sheet[xlsx.utils.encode_cell({r: rowNum, c: 0})].v,
                surname: sheet[xlsx.utils.encode_cell({r: rowNum, c: 1})].v,
                email: sheet[xlsx.utils.encode_cell({r: rowNum, c: 2})].v,
                bithday: sheet[xlsx.utils.encode_cell({r: rowNum, c: 3})].v,
                dni: sheet[xlsx.utils.encode_cell({r: rowNum, c: 4})].v,
                idBoss: sheet[xlsx.utils.encode_cell({r: rowNum, c: 5})].v, // Este es el cod que identifica a un Jefe de quipo 
                rrpp: sheet[xlsx.utils.encode_cell({r: rowNum, c: 6})].v, // Hay que buscar a este RRPP
              }
              newRRPP(tmpObject, dbConexion).then((res)=>{
              }).catch((err)=>{ console.log('Error', err)});
            }
            // else {
            //   // preparar rrpps incorrectos
            // }
        }
        fs.unlinkSync(path + '/'+ file)
      });
    }
    );
};

function getBosses(dbConexion) {
  return new Promise((resolve, reject) =>{
    dbConexion.collection('Relaciones').find({rrpp: 'JEFE'}).toArray((err, res) =>{
      if(err)
        reject(err);
      else
        resolve(res);
    });
  });
}

const generateQR = function(text, fullPath){
  return new Promise((resolve, reject) => {
    qrcode.toFile(fullPath, text,{type: "png"}, async (err) => {
      if(err)
        reject(err);
      else 
        resolve(fullPath);
    });
  });
}

const sendEmail =  function(email, fileName, fullPath, nameRRPP){
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      service:'gmail',
      auth: {
        user: 'enjoymadridmad@gmail.com',
        pass: '@Testing123'
      }
    });
    transporter.sendMail({
      from: '"Enjoy Madrid" enjoymadridmad@gmail.com',
      to: email,
      subject: "QR Acceso",
      html: '<!DOCTYPE html><html><head><title></title></head><body>Hola '+ nameRRPP +' con este código tanto udted como su clientes tendran entrada gratutita a la discoteca <br><img src="cid:'+ fileName +'"/></body></html>',
      attachments: [{
        filename:fileName,
        path: fullPath,
        cid: fileName
      }]
    }).then(() => resolve(fs.unlinkSync(fullPath))).catch((err) => reject(err));
  });
};

module.exports = {
  importRRPPs,
  newRRPP,
  getBosses,
}; 