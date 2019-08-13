
var jwt = require('jsonwebtoken');
var config = require('./config');
var expresJWT = require('express-jwt');

function generateToken(emailUser){
    var token = jwt.sign({username: emailUser}, config.enviroment.Secure_Password_Token,{expiresIn: '2 days'})
    return token;
}

var auth = expresJWT({
  secret: config.enviroment.Secure_Password_Token
});
let checkToken = (req, res, next) => {
  console.log('Checking');
      let token = req.headers['authorization']; // Express headers are auto converted to lowercase
      if (token && token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
      }
      if (token) {
        console.log('Hay token')
        jwt.verify(token, config.enviroment.Secure_Password_Token, (err, decoded) => {
          if (err) {
            console.log('Hay error token')
            return res.status(404).json({
              success: false,
              message: 'Token is not valid'
            });
          } else {
            req.app.locals.db.collection('Usuarios').find( { email: decoded.username, token: token }).toArray((errSearch, result) =>{
              if (errSearch){
                return res.status(404).json({
                  success: false,
                  message: 'Error al buscar el usuario'
                });
              }
              else if(result.length === 0) {
                return res.status(404).json({
                  success: false,
                  message: 'Token antiguo'
                });
              }
              else{
                req.decoded = decoded;
                next();
              }
          });
          }
        });
      } else {
        console.log('No hay token')
        return res.status(404).json({
          success: false,
          message: 'Auth token is not supplied'
        });
      }
  };
  
  module.exports = {
     checkToken,
     generateToken,
     auth,
  }