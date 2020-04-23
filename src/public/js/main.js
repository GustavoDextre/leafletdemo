var map = L.map('map-template').setView([-12.0630149, -77.0296179], 10);

const openStreetURL = 'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png';
const stamenTonerURL = 'http://a.tile.stamen.com/toner/{z}/{x}/{y}.png';
const darkMatterURL = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png';

var tile = L.tileLayer(openStreetURL);

function selectMap(){

    var mappingValue = document.getElementById('mapping').value;

    if(mappingValue == 1){
        tile = L.tileLayer(openStreetURL);
        map.addLayer(tile);
    }
    if(mappingValue == 2){
        tile = L.tileLayer(stamenTonerURL);
        map.addLayer(tile);
    }
    if(mappingValue == 3){
        tile = L.tileLayer(darkMatterURL);
        map.addLayer(tile);
    }
}

var texto = 'Usted está aquí'

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
      }
  });
}

// Marker
/* const marker = L.marker([-12.0630149, -77.0296179]); // kiev, ukraine
marker.bindPopup('Hello There!');
map.addLayer(marker); */

// Geolocation
map.locate({enableHighAccuracy: true});
map.on('locationfound', (e) => {
const coords = [e.latlng.lat, e.latlng.lng];
const newMarker = L.marker(coords);
newMarker.bindPopup(texto);
map.addLayer(newMarker);
socket.emit('userCoordinates', e.latlng);
});

// socket new User connected
socket.on('newUserCoordinates', (coords) => {
  console.log(coords);
  const userIcon = L.icon({
    iconUrl: '/img/icon2.png',
    iconSize: [38, 42],
  })
  const newUserMarker = L.marker([coords.lat, coords.lng], {
    icon: userIcon 
  });
  newUserMarker.bindPopup('New User!');
  map.addLayer(newUserMarker);
}); 

map.addLayer(tile);
