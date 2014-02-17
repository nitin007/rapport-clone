var Twit = require('twit');

var T = new Twit({
  consumer_key: 'RbuEoeuGbaHXkgufBFv2Jw',
  consumer_secret: '3ystCgIUDEC39SZJYoRt0iXORd7bItAswzqSaUOwkaM',
  access_token: '603337472-iqxyAfbKDAY8TUWs5jMr5ZHNM2OXfVglFc9RWjxn',
  access_token_secret: 'JSsSfnOIwpuAJxoAwOs6mzyjNewbOy7AKbncJ8xAPB40k'
});

exports.getDetails = function (handle, callback) {
  var tw_req_st = new Date();
  var api_res;
  
  T.get('statuses/user_timeline', {
    screen_name: handle
  }, function(err, twRes) {
    if (err) {
      api_res = 'Not Found';
    } else {
      api_res = twRes;
    }
    console.log("Twitter took: %d secs", (new Date() - tw_req_st) / 1000);
    callback(api_res);
  });
}