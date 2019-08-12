var express = require('express');
var autentitcation = require('./autentication')
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

// app.use(require('body-parser').json());
// app.use(function(req,res,next){
//     try{
//       console.log('Esto es una header',req.headers);
//     const token = req.headers.authorization.split(" ")[1]
//     jwt.verify(token, key.tokenKey, function (err, payload) {
//         console.log(payload)
//         if (payload) {
//             user.findById(payload.userId).then(
//                 (doc)=>{
//                     req.user=doc;
//                     next()
//                 }
//             )
//         } else {
//            next()
//         }
//     })
// }catch(e){
//     next()
// }
// })
app.use(express.json());
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept, Authorization");
  return next();
});
app.use(express.static('public'));

app.all("/*", function (req, res, next) {
  if(req.url.includes("/login"))
    return next();
  else 
    return autentitcation.checkToken(req, res, next);
});

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