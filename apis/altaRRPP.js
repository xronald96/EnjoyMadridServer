var express = require('express');
var router = express.Router();
var functionAltaRRPP = require('../functions/altaRRPP')
 
const multipart = require('connect-multiparty'); // para la tranferencia de los datos
const multipartMiddleware = multipart({
    uploadDir: './uploads'
});
//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  next();
});
 
 
// Define the home page route
router.post('/import-rrpp', multipartMiddleware, function(req, res) {
    functionAltaRRPP.importRRPPs()
	req.on('data', chunk => {
    functionAltaRRPP.importRRPPs();
    console.log('body', req.body); // convert Buffer to string
});
res.send("");
});
 

// Define the home page route
router.post('/new-rrpp', function(req, res) {
	req.on('data', chunk => {
    console.log('body', chunk.toString()); // convert Buffer to string
});
res.send("");
});


module.exports = router;