


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


module.exports = {
    getRRPPP
}; 