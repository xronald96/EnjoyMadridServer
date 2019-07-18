var express = require('express');
var router = express.Router();
var actionUser = require('../actions/usuarios')
//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
 
 
// Define the home page route
router.post('', function(req, res) {
    actionUser.createUser(req.body, req.app.locals.db).then((result) =>{
        res.status(200).send(result);
    }).catch(err =>{
        res.status(400).send(err);
    });
});
 
// Define the about route
router.get('', function(req, res) {
  res.send('About us');
});
 
 
module.exports = router;