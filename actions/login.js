
var autentication = require('../autentication');
function login(credentials, dbConexion){

    return new Promise((resolve, reject) =>{
        console.log('Entro a la promesa');
        dbConexion.collection('Usuarios').find({email: credentials.email}).toArray((err, res) =>{
            console.log('Busco', err, res);
            if(err)
                reject("Error buscado al usario " + err);
            else if (res.length !== 1) {
                reject("Usuario no encontrado");
            }
            else {
                console.log('Entro aqui');
                const tmp = res[0];
                const userToken = autentication.generateToken(credentials.email);
                if(tmp.password === credentials.password){
                    dbConexion.collection('Usuarios').updateOne({'_id' : tmp._id},  {'$set' : {'token' : userToken }}).then((res) => {
                            resolve({
                                email: tmp.email,
                                _id: tmp._id,
                                idCompany: tmp.idCompany,
                                token: userToken
                            });
                        }
                    ).catch((err) => {
                        reject(err);
                    });
                    
                }
            }
        })
    });

}

module.exports = {
    login
}