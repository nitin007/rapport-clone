/*
 * GET home page.
 */
var fb = require('./../apis/facebook.js');
var tw = require('./../apis/twitter.js');
var gh = require('./../apis/github.js');
var gm = require('./../apis/gmap.js');
var weather = require('./../apis/weather.js');

var req_st;

exports.index = function(req, res) {
  req_st = new Date();

  if (req.method == 'GET') {
    res.render('index', {
      title: 'Rapport Clone'
    });
  } else {
    var collectiveRes = {};
    
    fb.getDetails(req.body.fbUser, function(api_res){
      collectiveRes.fb = api_res;
      sendResp(collectiveRes, res);
    });
    
    gh.getDetails(req.body.ghUser, function(api_res){
      collectiveRes.gh = api_res;
      sendResp(collectiveRes, res);
    });
    
    tw.getDetails(req.body.twUser, function(api_res){
      collectiveRes.tw = api_res;
      sendResp(collectiveRes, res);
    });
    
    gm.fetchMap(req.body.gmUser, function(api_res){
      collectiveRes.gm = api_res;
      sendResp(collectiveRes, res);
    });
    
    weather.getDetails(req.body.ywUser, function(api_res){
      collectiveRes.yt = api_res;
      sendResp(collectiveRes, res);
    });
  }
};


function sendResp(collectiveRes, res) {
  if (Object.keys(collectiveRes).length === 5) {
    console.log("Total time taken: %d secs", (new Date() - req_st) / 1000);
    res.json(collectiveRes);
    res.end();
  }
}
