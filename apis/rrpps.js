var express = require('express');
var router = express.Router();
var rrpps = require('../actions/rrpps')
 
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
    rrpps.importRRPPs(req.app.locals.db)
    res.send("");
});
 

// Define the home page route
router.post('/new-rrpp', function(req, res) { 
    rrpps.newRRPP(req.body, req.app.locals.db).then((resObject) => {
        res.send(resObject);
    }).catch((err) =>{
        res.status(400).send(err);
    });
});


router.get('/select-boss', (req, res)=>{
    rrpps.getBosses(req.app.locals.db).then((resObject) =>{
        res.status(200).send(resObject);
    }).catch((err) =>{
        res.status(400).send(err);
    });
});


module.exports = router;