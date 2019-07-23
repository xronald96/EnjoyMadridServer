var express = require('express');
var app = express();
// var MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://DevRonald:EnjoyMadridDev@enjoymadrid-rlmhn.mongodb.net/test?retryWrites=true&w=majority"; 

// MongoClient.connect(uri, { useNewUrlParser: true })
// .then(client => {
//   const db = client.db('EnjoyMadrid');
//   app.locals.db = db;
// }).catch(error => console.error(error));




app.use(express.json());
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  return next();
});
app.use(express.static('public'));
 
//Routes
app.use('/login', require('./apis/login')); 
app.use('/rrpps', require('./apis/rrpps')); 
app.use('/usuarios', require('./apis/usuarios'));
app.use('/asistencia-rrpp', require('./apis/asistencia-rrpp'));
app.use('/discotecas', require('./apis/discotecas'));
 
// ####################################  DEV  ###################################
// const host = 'localhost';
// const port = 3000;

// ####################################  PRO  ###################################
const host = '0.0.0.0';
const port = process.env.PORT || 3000;

var server = app.listen(port, host, function() {
  console.log("Server started in ", host, ' ',port);
});