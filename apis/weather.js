var weather = require('weather');

var params = {
  location: null,
  appid: "dDfIKhXV34Eq7pmipniTh3Bza0dokIG8qa3O1lypf9brOoPFS2LkQIh6stxUVdgw9wGvkxY-",
  logging: true
};

exports.getDetails = function(location, callback) {
  var yw_req_st = new Date();
  var result = 'Not Found';
  params.location = location;
  
  weather(params, function(err, yTemp) {
    if (yTemp) result = yTemp;
    
    console.log("Weather took: %d secs", (new Date() - yw_req_st) / 1000);
    callback(result);
  });
}