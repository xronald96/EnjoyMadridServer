var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://DevRonald:EnjoyMadridDev@enjoymadrid-rlmhn.mongodb.net/test?retryWrites=true&w=majority7"; 

MongoClient.connect(uri, { useNewUrlParser: true })
.then(client => {
  const db = client.db('EnjoyMadrid');
  app.locals.db = db;
}).catch(error => console.error(error));




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

app.get('/', (req, res) =>{
  res.send("Servidor desplegado");
})
 
var server = app.listen(process.env.PORT || 8000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
 
})