var request = require("request");

var options = { method: 'GET',
  url: 'https://api.themoviedb.org/3/search/movie?api_key=83b6a07dc9c37585418713789d05054b&language=en-US&query=John&page=1&include_adult=false',
  qs:
   { page: '1',
     language: 'en-US',
     api_key: '83b6a07dc9c37585418713789d05054b' },
  body: '{}' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
