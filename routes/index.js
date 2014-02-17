/*
 * GET home page.
 */
var FB = require('fb');
var github3 = require('github3');
var fb_access_token = 'CAACEdEose0cBAItooAG18dZAD0LMaB7PRzTu0Hgt5jHscf2kUJiNKGqgqqLq6I7oMyTACE2wC6NXZAOdZAlOhkPBP74iowP5D3qxy38UvqZBJW7GXJgFMBkktZCHD8dk332bg2pGUAFVXLDLoPW9QVA0d6PfVoZAZBiU4BMiq31NpR8qDvgnAZBRe3rovD4J48MX83TT25bZCAAZDZD';
var Twit = require('twit')
var gm = require('googlemaps');
var weather = require('weather');
var fetchYwTemp;
var T = new Twit({
  consumer_key: 'RbuEoeuGbaHXkgufBFv2Jw',
  consumer_secret: '3ystCgIUDEC39SZJYoRt0iXORd7bItAswzqSaUOwkaM',
  access_token: '603337472-iqxyAfbKDAY8TUWs5jMr5ZHNM2OXfVglFc9RWjxn',
  access_token_secret: 'JSsSfnOIwpuAJxoAwOs6mzyjNewbOy7AKbncJ8xAPB40k'
});

var req_st;

exports.index = function(req, res) {
  req_st = new Date();

  if (req.method == 'GET') {
    res.render('index', {
      title: 'Rapport Clone'
    });
  } else {
    var collectiveRes = {};
    fetchFbUser(req.body.fbUser, res, collectiveRes);
    fetchGithubUser(req.body.ghUser, res, collectiveRes);
    fetchTwitterUser(req.body.twUser, res, collectiveRes);
    fetchGmImage(req.body.gmUser, res, collectiveRes);
    fetchYwTemp(req.body.ywUser, res, collectiveRes);
  }
};

function fetchFbUser(user, res, collectiveRes) {
  var fb_req_st = new Date();
  FB.api(user, function(fbRes) {
    if (!fbRes || fbRes.error) {
      // console.log(!fbRes ? 'error occurred' : fbRes.error);
      collectiveRes.fb = 'Not Fount'
    } else {
      collectiveRes.fb = fbRes;
    }
    console.log("Facebook took: %d secs", (new Date() - fb_req_st) / 1000);
    sendResp(collectiveRes, res);
  });
}

function fetchGithubUser(user, res, collectiveRes) {
  var gh_req_st = new Date();
  github3.getUserRepos(user, function(error, ghRes) {
    if (error) {
      collectiveRes.gh = 'Not Found';
    } else {
      collectiveRes.gh = ghRes;
    }
    console.log("Github took: %d secs", (new Date() - gh_req_st) / 1000);
    sendResp(collectiveRes, res);
  });
}

function fetchTwitterUser(handle, res, collectiveRes) {
  var tw_req_st = new Date();
  T.get('statuses/user_timeline', {
    screen_name: handle
  }, function(err, twRes) {
    if (err) {
      collectiveRes.tw = 'Not Found';
    } else {
      collectiveRes.tw = twRes;
    }
    console.log("Twitter took: %d secs", (new Date() - tw_req_st) / 1000);
    sendResp(collectiveRes, res);
  });
}

function fetchGmImage(location, res, collectiveRes) {
  var gm_req_st = new Date();
  var markers = [{
    'location': location,
    'color': 'red',
    'label': 'A',
    'shadow': 'false',
    'icon': 'http://3.bp.blogspot.com/-KCTCIdR7djA/Tyzrk7-WPZI/AAAAAAAAAWM/64LkjNJz29k/s1600/Map_pin1.png'
  }];
  var gMap = gm.staticMap(location, 10, '500x400', function(err, data) {
    console.log("Gmap took: %d secs", (new Date() - gm_req_st) / 1000);
  }, false, false, markers);

  collectiveRes.gm = gMap;
  sendResp(collectiveRes, res);
}

(function() {
  var params = {
    location: null,
    appid: "dDfIKhXV34Eq7pmipniTh3Bza0dokIG8qa3O1lypf9brOoPFS2LkQIh6stxUVdgw9wGvkxY-",
    logging: true
  };

  fetchYwTemp = function(location, res, collectiveRes) {
    var yw_req_st = new Date();
    var result = 'Not Found';
    params.location = location;
    weather(params, function(err, yTemp) {
      if (yTemp) {
        result = yTemp;
      }
      console.log("Weather took: %d secs", (new Date() - yw_req_st) / 1000);
      collectiveRes.yt = result;
      sendResp(collectiveRes, res);
    });
  }
})();

function sendResp(collectiveRes, res) {
  if (Object.keys(collectiveRes).length === 5) {
    console.log("Total time taken: %d secs", (new Date() - req_st) / 1000);
    res.json(collectiveRes);
    res.end();
  }
}
