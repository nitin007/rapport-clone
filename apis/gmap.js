var gm = require('googlemaps');

var markers = [{
  'location': null,
  'color': 'red',
  'label': 'A',
  'shadow': 'false',
  'icon': 'http://3.bp.blogspot.com/-KCTCIdR7djA/Tyzrk7-WPZI/AAAAAAAAAWM/64LkjNJz29k/s1600/Map_pin1.png'
}];

exports.fetchMap = function (location, callback) {
  var gm_req_st = new Date();
  
  var gMap = gm.staticMap(location, 10, '500x400', function(err, data) {
    markers[0].location = location;
    
    console.log("Gmap took: %d secs", (new Date() - gm_req_st) / 1000);
  }, false, false, markers);

  callback(gMap);
}