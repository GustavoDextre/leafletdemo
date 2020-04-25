const mongoose = require("mongoose");

const { Schema } = mongoose;

const coordsSchema = new Schema({
    idsocket: {type:String},
    latitud: {type:Number},
    longitud: {type:Number},
    nombre: {type:String}
},{ timestamps: true });

module.exports = mongoose.model("coords", coordsSchema);