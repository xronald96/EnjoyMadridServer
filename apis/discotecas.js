var express = require('express');
var router = express.Router();
var actionDiscotecas =  require('../actions/discotecas') 
//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Discotecas: ', Date.now());
  next();
});
 
 
// Define the home page route
router.get('', function(req, res) {
    actionDiscotecas.getDiscotecas().then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(400).send(err);
    });
});
 
module.exports = router;