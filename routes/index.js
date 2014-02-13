/*
 * GET home page.
 */
var collectiveRes = {};
var FB = require('fb');
var github3 = require('github3');
var fb_access_token = 'CAACEdEose0cBAItooAG18dZAD0LMaB7PRzTu0Hgt5jHscf2kUJiNKGqgqqLq6I7oMyTACE2wC6NXZAOdZAlOhkPBP74iowP5D3qxy38UvqZBJW7GXJgFMBkktZCHD8dk332bg2pGUAFVXLDLoPW9QVA0d6PfVoZAZBiU4BMiq31NpR8qDvgnAZBRe3rovD4J48MX83TT25bZCAAZDZD';
// FB.setAccessToken(fb_access_token);
var Twit = require('twit')

var T = new Twit({
  consumer_key: 'RbuEoeuGbaHXkgufBFv2Jw',
  consumer_secret: '3ystCgIUDEC39SZJYoRt0iXORd7bItAswzqSaUOwkaM',
  access_token: '603337472-iqxyAfbKDAY8TUWs5jMr5ZHNM2OXfVglFc9RWjxn',
  access_token_secret: 'JSsSfnOIwpuAJxoAwOs6mzyjNewbOy7AKbncJ8xAPB40k'
});

exports.index = function(req, res) {
  if (req.method == 'GET') {
    res.render('index', {
      title: 'Rapport Clone'
    });
  } else {
    fetchFbUser(req.body.fbUser, res);
    fetchGithubUser(req.body.ghUser, res);
    fetchTwitterUser(req.body.twUser, res);
  }
};

function fetchFbUser(user, res) {
  FB.api(user, function(fbRes) {
    if (!fbRes || fbRes.error) {
      console.log(!fbRes ? 'error occurred' : fbRes.error);
      return;
    }
    collectiveRes.fb = fbRes;
    sendResp(collectiveRes, res);
  });
}

function fetchGithubUser(user, res) {
  github3.getUserRepos(user, function(error, ghRes) {
    collectiveRes.gh = ghRes;
    sendResp(collectiveRes, res);
  });
}

function fetchTwitterUser(handle, res) {
  T.get('statuses/user_timeline', {
    screen_name: handle
  }, function(err, twRes) {
    collectiveRes.tw = twRes;
    sendResp(collectiveRes, res);
  });
}

function sendResp(collectiveRes, res) {
  if (Object.keys(collectiveRes).length === 3) {
    res.json(collectiveRes);
    res.end();
  }
}
