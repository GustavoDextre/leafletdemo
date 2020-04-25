const express = require('express');
const mongoose = require("mongoose");
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const { PORT, MONGO_URI } = require("../config");
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true });
const { MapaRouter } = require("../routes");

const app = express();
const server = http.Server(app);
const io = socketIO(server);

// routes
app.use("/", MapaRouter);

// sockets
require('./sockets')(io);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
server.listen(PORT, () => {
  console.log('Server on port', PORT);
});