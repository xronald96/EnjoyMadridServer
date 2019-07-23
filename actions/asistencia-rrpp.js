


function getRRPPP(textToSearch, dbConexion){ // Muchos por hacer aqui
    return new Promise((resolve, reject) => {
        dbConexion.collection('Relaciones').find({$or: [ { email: textToSearch }, { listName: textToSearch } ]}).toArray((err, res) =>{
            console.log(textToSearch, err, res);
            if (err)
                reject('Error al buscar el relaciones ' + textToSearch + ': ' , err);
            else 
                resolve(res[0]);
        });
    });
}


module.exports = {
    getRRPPP
}; 