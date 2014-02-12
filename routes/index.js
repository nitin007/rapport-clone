/*
 * GET home page.
 */
var FB = require('fb');
var fb_access_token = 'CAACEdEose0cBAOrZBpYwpkW5grKfZCZCdZAIU8L76MkyEBA9ZBuyjRjAZAna2ilREUsY9VxxatWc5RRML3wc9W7W5O2Sooh8KdnG69mjAZC3cOYUowupjawjWJdZB12fa8ifM5Cl03OMX3JYxkcwEID4y9QSLT4kmovElTmmEkIK1N7ZAOvWGKZCota8Le8VZAibzc17TKE3var7AZDZD';
FB.setAccessToken(fb_access_token);
exports.index = function(req, res) {
    if (req.method == 'GET') {
        res.render('index', {
            title: 'Rapport Clone'
        });
    } else {
        checkUserName("miteshsondhi", res);
        // res.end('hjb');
    }
};

// exports.process = function(req, res) {
//     checkUserName(req.param("facebook", null), res);
//     res.render('index');
// }


function checkUserName(user, res) {
  FB.api(user, function(fbRes) {
    if (!fbRes || fbRes.error) {
      console.log(!fbRes ? 'error occurred' : fbRes.error);
      return;
    }
    console.log(fbRes);
    res.json(fbRes);
    res.end();
  });
}
