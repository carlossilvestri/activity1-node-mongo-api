const express = require('express');
const routes = require('./routes');
require('dotenv').config({ path: 'variables.env' });
require('./config/db');
//Crear el servidor.
const app = express();


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://carlos:Kar2La30@cluster0.f6c9w.mongodb.net/activity1?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("activity1").collection("users");
  // perform actions on the collection object
  client.close();
});

//Habilitar bodyParser
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
  });

//Rutas de la app.
app.use('/', routes());



const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;
app.listen(port, host, () => console.log(`El servidor funciona en el puerto ${port}`));