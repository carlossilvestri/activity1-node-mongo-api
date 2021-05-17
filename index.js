const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

//Crear el servidor.
const app = express();
//Conectar a MongoDB 
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,

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