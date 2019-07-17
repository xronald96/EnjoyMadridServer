


function getRRPPP(textToSearch, dbConexion){ // Muchos por hacer aqui
    return new Promise((resolve, reject) => {
        dbConexion.collection('RRPP').find({email: objectUser.email}).toArray((err, res) =>{

        });
    });
}


module.exports = {
    getRRPPP
}; 