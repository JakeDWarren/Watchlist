
const JustWatch = require('./');
const fetch = require('node-fetch');
const express = require('express');
const app = express();
const port = 3001;
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/WatchList";



app.get('/retrievedata', req, res) => {
  fetch(print_result);
  .then(res => res.json())
  .then(json => console.log(json));
}

app.get('/', (req, res) => {
  res.send("oh no");
});

MongoClient.connect(url, function(err, db){
  if (err) throw err;
  console.log("Database created");
  db.close();
})

app.listen(port, () => {
  console.log("server listening on port" + port);
});


function print_result(name, result)
{
	console.log(name+":");
	console.log(JSON.stringify(result, null, 4));
	console.log("\n\n\n\n");
}

(async function(){
	var justwatch = new JustWatch();

	var searchResult = await justwatch.search({query: 'Hannibal'});
	print_result("search", searchResult);

	var episodes = await justwatch.getEpisodes(searchResult.items[0].id);
	print_result("episodes", episodes);


})();
//console.log(JSON.stringify(print_result);
