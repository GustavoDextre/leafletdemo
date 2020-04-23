module.exports = io => {
    io.on('connection', socket => {
  
      console.log('Nuevo usuario conectado');
  
      socket.on('userCoordinates', (data) => {
        console.log(data.latlng, data.nombre);
        socket.broadcast.emit('newUserCoordinates', data);
      });
    });
  };