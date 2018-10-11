
const JustWatch = require('./');
var express = require("express");
var app = express();
var port = 3001;

app.get("/", (req, res) => {
  res.send("yikes");
});

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

	var searchResult = await justwatch.search({query: 'Thor'});
	print_result("search", searchResult);

	var episodes = await justwatch.getEpisodes(searchResult.items[0].id);
	print_result("episodes", episodes);

	console.log(searchResult);
})();
