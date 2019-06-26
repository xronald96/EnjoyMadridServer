const express = require('express');
const qrcode = require('qrcode');
const xlsx = require('xlsx');
const nodemailer = require("nodemailer");
const qr = require('qr-image');
/*
DATOS TESTING CORREO GMAIlL
USER: enjoymadridmad@gmail.com
PASS:  @Testing123
*/

var path = './uploads/';
var fs = require('fs');
function importRRPPs(){
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
            const secondCell = sheet[xlsx.utils.encode_cell({r: rowNum, c: 1})];
            if(sheet[xlsx.utils.encode_cell({r: rowNum, c: 0})].v &&
            sheet[xlsx.utils.encode_cell({r: rowNum, c: 1})].v &&
            sheet[xlsx.utils.encode_cell({r: rowNum, c: 2})].v &&
            sheet[xlsx.utils.encode_cell({r: rowNum, c: 4})].v ) {
                  let data = sheet[xlsx.utils.encode_cell({r: rowNum, c: 0})].v + '^' + sheet[xlsx.utils.encode_cell({r: rowNum, c: 2})].v + '^' 
                  + sheet[xlsx.utils.encode_cell({r: rowNum, c: 4})].v
                  let nameRRPP = sheet[xlsx.utils.encode_cell({r: rowNum, c: 0})].v + ' ' + sheet[xlsx.utils.encode_cell({r: rowNum, c: 1})].v;
                  generateQR(data, './uploads/'+data+'.png').then(fullPath => {
                    sendEmail(sheet[xlsx.utils.encode_cell({r: rowNum, c: 2})].v, data+'.png', fullPath, nameRRPP).catch(err => console.log('Este error', err));
                  }).catch(err => console.log("ERROR: " ,err));
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
// const genereteQR = async function(text) {
//   var qr_png = qrcode.toFile('./uploads/qr.png','hola',{type: "png"}, async (err) =>{
//     let transporter = nodemailer.createTransport({
//       service:'gmail',
//       auth: {
//         user: 'enjoymadridmad@gmail.com',
//         pass: '@Testing123'
//       }
//     });
  
//     let info = transporter.sendMail({
//       from: '"Enjoy Madrid" enjoymadridmad@gmail.com',
//       to: 'correo1@yopmail.com',
//       subject: "QR Acceso",
//       html: 'Embedded image: <img src="cid:unique@kreata.ee"/>',
//       attachments: [{
//         filename:'qr.png',
//         path: './uploads/qr.png',
//         cid: 'unique@kreata.ee'
//       }]
      
//     }).then().catch(err => {
//       console.log('Esto es un error', err);
//     });
//   });
// };

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
      to: email, //correo1@yopmail.com
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
module.exports.importRRPPs = importRRPPs;