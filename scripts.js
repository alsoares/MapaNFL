var listaTimes = [];
var map;
var service;
var infowindow;
var aaa;
var localizacao = [];
var contador = 0;
var kansas = { lat: 40.548468, lng: -99.623574 };

function initMap() {
  
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: kansas
  });
  service = new google.maps.places.PlacesService(map);


retornarTimes();

listaTimes.forEach(element => {

  var request = {
          location: kansas,
          query: element.stadiumName
      };

      localizacaoEstadio(request, element);
  
});

      
}
  



function localizacaoEstadio(request, element){     
     service.textSearch(request, function (results, status){
       if (status == google.maps.places.PlacesServiceStatus.OK) {
         var place = results[0];
         criarMarcador(place.geometry.location, element);
         localizacao.push(place);
       }
       else if(status == google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT){
        setTimeout(function(){
          localizacaoEstadio(request, element);
        },0)
        
       }

     });
   }

function criarMarcador(local, time)
{
var marker = new google.maps.Marker({
    position: local,
    map: map,
    label: time.abbr
  });
}

function retornarTimes()
{
var url = 'http://feeds.nfl.com/feeds-rs/teams/2017.json';
$.ajax({
      url: url, 
      type: 'GET',
      async: false,
      success: function(result){
        result.teams.forEach(e => {
          if(e.abbr != 'AFC' || e.abbr != 'NFC'){
            listaTimes.push(e);
          }
      });
    }

});
}


/*
function PreencheLatitudelongitude(cidade){
var key  = 'AIzaSyCLYBtLfJBStBP9qsVRK34263G95ZhWg0U';
var url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=' +cidade + '&key=' + key;
    $.ajax({
      url: url, 
      type: 'GET',
      async: false,
      success: function(result){
        localizacao = {
              lat: result.results[0].geometry.location.lat,
              lng: result.results[0].geometry.location.lng
            };
      }
    });
}

*/
    