var express = require('express');
var os = require('os');
var ifaces = os.networkInterfaces();
var app = express();

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://DevRonald:EnjoyMadridDev@enjoymadrid-shard-00-00-rlmhn.mongodb.net:27017,enjoymadrid-shard-00-01-rlmhn.mongodb.net:27017,enjoymadrid-shard-00-02-rlmhn.mongodb.net:27017/test?ssl=true&replicaSet=EnjoyMadrid-shard-0&authSource=admin&retryWrites=true&w=majority"; 
MongoClient.connect(uri, function(err, client) {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   else {
    console.log('Connected...');
    const db = client.db('EnjoyMadrid');
    app.locals.db = db;
   }
});



Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      console.log(ifname + ':' + alias, iface.address);
    } else {
      // this interface has only one ipv4 adress
      console.log(ifname, iface.address);
    }
    ++alias;
  });
});

app.use(express.json());
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept, Authorization");
  return next();
});
app.use(express.static('public'));

// app.use(autentitcation.auth);

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