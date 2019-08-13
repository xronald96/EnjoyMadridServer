var moment = require('moment');
var ObjectID = require('mongodb').ObjectID

function getRRPPP(textToSearch, dbConexion){ // Muchos por hacer aqui
    return new Promise((resolve, reject) => {
        dbConexion.collection('Relaciones').find({$or: [ { email: textToSearch }, { listName: textToSearch } ]}).toArray((err, res) =>{
            if (err)
                reject('Error al buscar el relaciones ' + textToSearch + ': ' , err);
            else 
                resolve(res);
        });
    });
}

function signRRPP(idRRPP, dbConexion){
    return new Promise((resolve, reject) => {
        dbConexion.collection('Relaciones').find(ObjectID(idRRPP.id)).toArray((err, res) =>{
            if (err){
                console.log('Entramos error: ', err);
                reject('Error al buscar el relaciones: ' , err);
            }
            else if(res.length === 0) {
                reject("Id no encontrado: ", idRRPP.id)
            }
            else{
                const curRRPP = res[0];
                const curDate = moment().format('DD/MM/YYYY'); // Fecha en formato dd/mm/yyyy
                if(!curRRPP.assistance) {
                    dbConexion.collection('Relaciones').updateOne({'_id' : curRRPP._id},  {'$set' : {'assistance' : [curDate] }}).then((res) => {
                        resolve("Firmado");
                    }
                    ).catch((err) => {
                        reject(err);
                    });
                }
                else if(curRRPP.assistance && !curRRPP.assistance.includes(curDate)) {
                    curRRPP.assistance.push(curDate);
                    dbConexion.collection('Relaciones').updateOne({'_id' : curRRPP._id},  {'$set' : {'assistance' :  curRRPP.assistance }}).then((res) => {
                        resolve({
                            success: true,
                            message: 'Firmado'
                          });
                    }
                    ).catch((err) => {
                        reject(err);
                    });
                } 
                else {
                   resolve({
                    success: true,
                    message: 'Asistencia ya añadida'
                  });
                }
            } 
        });
    });
}

module.exports = {
    getRRPPP,
    signRRPP,
}; 