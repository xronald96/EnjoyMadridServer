var express = require('express');
var router = express.Router();
var actionLogin = require('../actions/login');
var autentitcation = require('../autentication');
//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Login Time: ', Date.now());
  next();
});
 
// router.use(function timeLog(req, res, next) {
//   if(req.baseUrl.includes('login'))
//     next();
//   else 
//      autentitcation.checkToken(req, res, next);
// }
// );

// Define the home page route
router.post('', function(req, res) {
  actionLogin.login(req.body, req.app.locals.db).then(result =>{
    res.status(200).send(result);
  }).catch(err =>{
    res.status(404).send(err);
  });
});

 
 
module.exports = router;