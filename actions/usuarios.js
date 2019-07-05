

function createUser(objectUser, dbConexion){
    return new Promise((resolve, reject)=>{
        dbConexion.collection('Usuarios').find({email: objectUser.email}).toArray((err, res) =>{
            if(err)
                reject("Error crear usuario busqueda Email" + err);
            else if(res.length > 0) {
                reject("Este usuario ya esta dado de alta" + res[0]);
            }
            else {
                dbConexion.collection('Usuarios').insertOne(objectUser, (err, res) => {
                    if(err)
                        reject("Error al insertar usuario" + err);
                    else 
                        resolve(res.ops);
                });
            }
        });
    });
}

module.exports = {
createUser,

};