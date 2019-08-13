var express = require('express');
var router = express.Router();
var actionUser = require('../actions/usuarios')
var autentication = require('../autentication');

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Usuarios Time: ', Date.now());
  next();
});
 
 
// Define the home page route
router.post('', autentication.checkToken, function(req, res) {
    actionUser.createUser(req.body, req.app.locals.db).then((result) =>{
        res.status(200).send(result);
    }).catch(err =>{
        res.status(400).send(err);
    });
});
 
module.exports = router;