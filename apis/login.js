var express = require('express');
var router = express.Router();
 
//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Login Time: ', Date.now());
  next();
});
 
 
// Define the home page route
router.post('', function(req, res) {
	req.on('data', chunk => {
    console.log('body', chunk.toString()); // convert Buffer to string
});
res.send("");
});

 
 
module.exports = router;