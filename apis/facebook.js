var FB = require('fb');

var fb_access_token = 'CAACEdEose0cBAItooAG18dZAD0LMaB7PRzTu0Hgt5jHscf2kUJiNKGqgqqLq6I7oMyTACE2wC6NXZAOdZAlOhkPBP74iowP5D3qxy38UvqZBJW7GXJgFMBkktZCHD8dk332bg2pGUAFVXLDLoPW9QVA0d6PfVoZAZBiU4BMiq31NpR8qDvgnAZBRe3rovD4J48MX83TT25bZCAAZDZD';

exports.getDetails = function (user, callback) {
  var fb_req_st = new Date();
  FB.api(user, function(fbRes) {
    if (!fbRes || fbRes.error) {
      api_res = 'Not Fount'
    } else {
      api_res = fbRes;
    }
    
    console.log("Facebook took: %d secs", (new Date() - fb_req_st) / 1000);
    callback(api_res);
  });
}