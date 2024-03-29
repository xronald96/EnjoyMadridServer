var express = require('express');
var router = express.Router();
var actionAsistencia =  require('../actions/asistencia-rrpp') 
var autentication = require('../autentication');

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Asistencia RRPP Time: ', Date.now());
  next();
});
 
 
// Define the home page route
router.post('', autentication.checkToken, function(req, res) {
    actionAsistencia.getRRPPP(req.body.toSearch.toLowerCase(), req.app.locals.db).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

router.post('/sign', autentication.checkToken, function(req, res) {
    actionAsistencia.signRRPP(req.body, req.app.locals.db).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(400).send(err);
    });
});
 
module.exports = router;