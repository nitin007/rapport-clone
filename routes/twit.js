var twitter = require('ntwitter');

var twit = new twitter({
  consumer_key: 'RbuEoeuGbaHXkgufBFv2Jw',
  consumer_secret: '3ystCgIUDEC39SZJYoRt0iXORd7bItAswzqSaUOwkaM',
  access_token_key: '603337472-iqxyAfbKDAY8TUWs5jMr5ZHNM2OXfVglFc9RWjxn',
  access_token_secret: 'JSsSfnOIwpuAJxoAwOs6mzyjNewbOy7AKbncJ8xAPB40k'
});

twit
  .verifyCredentials(function (err, data) {
    console.log(data);
  });