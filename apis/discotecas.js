var express = require('express');
var router = express.Router();
var actionDiscotecas =  require('../actions/discotecas') 
var autentication = require('../autentication');

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Discotecas: ', Date.now());
  next();
});
 
 
// Define the home page route
router.get('', autentication.checkToken, function(req, res) {
    actionDiscotecas.getDiscotecas(req.app.locals.db).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(400).send(err);
    });
});
 
module.exports = router;