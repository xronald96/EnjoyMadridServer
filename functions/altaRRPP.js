var express = require('express');
var xlsx = require('xlsx');
var path = './uploads/';
var fs = require('fs');
function addingRRPPs(){
console.log('Entro al log')
    fs.readdir(path, (err, files) => {
        if (err) throw err;
        files.forEach(file => {
          const workbook = xlsx.readFile(path + '/'+ file);
          var sheet_name_list = workbook.SheetNames;
          let rrppsJSON = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
          console.log(rrppsJSON);
          rrppsJSON.forEach(row => {
            // DATOS VALIDOS Y DAR DE ALTA DE DATABASE
          });
        });
    });

};

module.exports.addingRRPPs = addingRRPPs;