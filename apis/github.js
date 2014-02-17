var github3 = require('github3');

exports.getDetails = function (user, callback) {
  var gh_req_st = new Date();
  var api_res;
  
  github3.getUserRepos(user, function(error, ghRes) {
    if (error) {
      api_res = 'Not Found';
    } else {
      api_res = ghRes;
    }
    
    console.log("Github took: %d secs", (new Date() - gh_req_st) / 1000);
    callback(api_res);
  });
}