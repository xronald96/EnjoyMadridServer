
var jwt = require('jsonwebtoken');
var config = require('./config');

function generateToken(emailUser){
    var token = jwt.sign({username: emailUser}, config.enviroment.Secure_Password_Token,{expiresIn: '2 days'})
    return token;
}

let checkToken = (req, res, next) => {
    console.log(req.headers)
    let token = req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    if (token) {
      jwt.verify(token, config.enviroment.Secure_Password_Token, (err, decoded) => {
        if (err) {
          return res.status(404).json({
            success: false,
            message: 'Token is not valid'
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Auth token is not supplied'
      });
    }
  };
  
  module.exports = {
     checkToken,
     generateToken,
  }