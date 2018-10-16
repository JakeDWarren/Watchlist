
const JustWatch = require('./');
const fetch = require('node-fetch');
const express = require('express');
const app = express();
const port = 3001;
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/WatchList";

let db;

app.get('/retrievedata', (req, res) => {
  fetch(print_result)
  .then(res => res.json())
  .then(json => console.log(json));
})

app.get('/', (req, res) => {
  res.send("oh no");
});

MongoClient.connect(url, function(err, client){
  if (err) throw err;
  console.log("Database created");
  db = client.db("WatchList");
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

	var searchResult = await justwatch.search({query: 'John'});
	print_result("search", searchResult);

	var episodes = await justwatch.getEpisodes(searchResult.items[0].id);
	print_result("episodes", episodes);

  db.collection('items').insertOne({ 'item': searchResult }, function (err, print_result) {
    if (err) throw err;
    console.log('insert success')
  })


})();
