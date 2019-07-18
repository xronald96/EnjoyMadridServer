var express = require('express');
var router = express.Router();
 
//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Login Time: ', Date.now());
  next();
});
 
 
// Define the home page route
router.post('/login', function(req, res) {
	req.on('data', chunk => {
    console.log('body', chunk.toString()); // convert Buffer to string
});
res.send("");
});
 
// Define the about route
router.get('/about', function(req, res) {
  res.send('About us');
});
 
 
module.exports = router;