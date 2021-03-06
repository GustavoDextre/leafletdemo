var map = L.map('map-template').setView([-12.0630149, -77.0296179], 10);

const openStreetURL = 'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png';
const stamenTonerURL = 'http://a.tile.stamen.com/toner/{z}/{x}/{y}.png';
const darkMatterURL = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
const cartoLightURL = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png';

var tile = L.tileLayer(openStreetURL);

function selectMap(){

    var mappingValue = document.getElementById('mapping').value;

    if(mappingValue == 1){
        tile = L.tileLayer(openStreetURL);
        map.addLayer(tile);
    }
    if(mappingValue == 2){
        tile = L.tileLayer(cartoLightURL);
        map.addLayer(tile);
    }
    if(mappingValue == 3){
        tile = L.tileLayer(darkMatterURL);
        map.addLayer(tile);
    }
    if(mappingValue == 4){
        tile = L.tileLayer(stamenTonerURL);
        map.addLayer(tile);
    }
}

// Socket Io
const socket = io.connect();

const user = () => {
  Swal.fire({
      title: "Ingrese su nombre por favor",
      input: 'text',
      showCancelButton: true        
  }).then((result) => {
      if (result.value) {
          Swal.fire(
              `Bienvenido ${result.value}`
            )

            map.locate({enableHighAccuracy: true});
            map.on('locationfound', (e) => {
                const coords = [e.latlng.lat, e.latlng.lng];
                const newMarker = L.marker(coords);
                newMarker.bindPopup(result.value);
                map.addLayer(newMarker);
                socket.emit('userCoordinates', {latlng: e.latlng, nombre: result.value});

            });

            socket.on('newUserCoordinates', (data) => {
                //console.log(data.latlng, data.nombre);
              
                
                        var newUserMarker = L.marker([data.latlng.lat, data.latlng.lng]);
                        newUserMarker.bindPopup(data.nombre);
                        map.addLayer(newUserMarker);
                  
                
                
              }); 

      }
  });
}

// Geolocation


// socket new User connected

socket.on('oldUserCoordinates', (data) => {
    //console.log(data.latlng, data.nombre);
  
    for(let i=0; i<data.length; i++){
      var newUserMarker = L.marker([data[i].latitud, data[i].longitud]);
      newUserMarker.bindPopup(data[i].nombre);
      map.addLayer(newUserMarker);
    }
    
}); 



map.addLayer(tile);
