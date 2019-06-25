var express = require('express');
var app = express();
var altaRRPP = require('./apis/altaRRPP');
app.use(express.json());
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  return next();
});
app.use(express.static('public'));
 
//Routes
app.use(require('./apis/login'));  //http://127.0.0.1:8000/    http://127.0.0.1:8000/about
app.use('/altaRRPP', altaRRPP); 
//app.use("/user",require('./routes'));  //http://127.0.0.1:8000/user  http://127.0.0.1:8000/user/about
 
//you can create more routs
//app.use("/admin",require('./adminroutes')); //http://127.0.0.1:8000/admin http://127.0.0.1:8000/admin/about
 
var server = app.listen(8000, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("Example app listening at http://%s:%s", host, port)
 
})