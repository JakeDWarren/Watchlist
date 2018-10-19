
const JustWatch = require('./script.js');
const fetch = require('node-fetch');
const express = require('express');
const app = express();
const port = 3001;
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/WatchList";
const bodyParser = require('body-parser');
var path = require('path');
let db;

app.use(bodyParser.urlencoded())
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

MongoClient.connect(url, function(err, client){
  if (err) throw err;
  console.log("Database created");
  db = client.db("WatchList");
})

app.get('/retrievedata', function(req, res){
  db.collection("results").find().toArray(function(err, result){
    if (err) throw err;
    res.send(result);
    console.log(result);
  })
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

app.post('/search', async function (req, res) {
  console.log('data', req.body.name)
  var justwatch = new JustWatch();
  var userSearch = req.body.name;
  var searchResult = await justwatch.search({query: userSearch});
  const cleanedData = searchResult.items.map((item, index) => {
    return {
      title: item.title,
      cinema_release_date: item.cinema_release_date,
      offer1: item.offers,
      runtime: item.runtime + " mintues"
    }
  })
    console.log(cleanedData)
  return res.json(cleanedData)
})
