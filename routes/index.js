
/*
 * GET home page.
 */

exports.index = function(req, res){
  if(req.method == 'GET'){
    res.render('index', { title: 'Rapport Clone' });
  } else {
    res.end('hjb');
  }
};

exports.process = function(req, res) {
  checkUserName("http://graph.facebook.com/", req.param("facebook", null));
  res.render('index');
}


function checkUserName(link, user, res) {
	console.log(user);
  
  request( link + user, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log(body);
    } else {
      console.log("user not present");
    }
  });
}
