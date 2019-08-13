
var autentication = require('../autentication');
function login(credentials, dbConexion){

    return new Promise((resolve, reject) =>{
        dbConexion.collection('Usuarios').find({email: credentials.email}).toArray((err, res) =>{
            if(err)
                reject("Error buscado al usario " + err);
            else if (res.length !== 1) {
                reject("Usuario no encontrado");
            }
            else {
                const tmp = res[0];
                const userToken = autentication.generateToken(credentials.email);
                dbConexion.collection('Usuarios').updateOne({'_id' : tmp._id},  {'$set' : {'token' : userToken }})
                if(tmp.password === credentials.password){
                    resolve({
                        email: tmp.email,
                        _id: tmp._id,
                        idCompany: tmp.idCompany,
                        token: userToken
                    });
                }
            }
        })
    });

}

module.exports = {
    login
}