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
                if(tmp.password === credentials.password){
                    resolve({
                        email: tmp.email,
                        _id: tmp._id,
                        idCompany: tmp.idCompany
                    });
                }
            }
        })
    });

}

module.exports = {
    login
}