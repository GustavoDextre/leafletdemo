const { DB_NAME, COLLECTION_NAME, MONGO_URI2 } = require("../config");
const { CoordsModel } = require("../models");
var MongoClient = require('mongodb').MongoClient;
var url = MONGO_URI2;

module.exports = io => {

    io.on('connection', socket => {
  
      console.log('Nuevo usuario conectado');
  
      socket.on('userCoordinates', async (data) => {
        console.log(data.latlng, data.nombre);
        var coords = new CoordsModel({
          idsocket: socket.id,
          latitud: data.latlng.lat,
          longitud: data.latlng.lng,
          nombre: data.nombre
        });
        await coords.save();

        await MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
          if (err) throw err;
          var dbo = db.db(DB_NAME);
          dbo.collection(COLLECTION_NAME).find({}).toArray(async function(err, result) {
            if (err) throw err;
            console.log(result);
            socket.broadcast.emit('newUserCoordinates', data);
            socket.emit('oldUserCoordinates', result);
            db.close();
          });
        });

        
      });


      socket.on('disconnect', async function(){
        id_user = socket.id;

        await MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
          if (err) throw err;
          var dbo = db.db(DB_NAME);
          var myquery = { idsocket: id_user };
          dbo.collection(COLLECTION_NAME).deleteOne(myquery, function(err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
          });
          dbo.collection(COLLECTION_NAME).find({}).toArray(async function(err, result) {
            if (err) throw err;
            console.log(result);
            socket.broadcast.emit('newUserCoordinates', result);
            socket.emit('oldUserCoordinates', result);
            db.close();
          });
        });
        

    });



    });
};