var express = require('express');
var router = express.Router();
var actionLogin = require('../actions/login') 
//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Login Time: ', Date.now());
  next();
});
 
 
// Define the home page route
router.post('', function(req, res) {
  actionLogin.login(req.body, req.app.locals.db).then(result =>{
    res.status(200).send(result);
  }).catch(err =>{
    res.status(404).send(err);
  });
});

 
 
module.exports = router;