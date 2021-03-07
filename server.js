// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:timeField", function (req, res){

  let date = new Date(req.params.timeField);
  console.log(date)
  if(date.toUTCString() !== "Invalid Date"){
    res.json({unix : date.getTime(), utc: date.toUTCString()});
  } else {
    let newDate = new Date(Number(req.params.timeField));
    if(newDate.toUTCString() !== "Invalid Date"){
      res.json({unix: newDate.getTime(), utc: newDate.toUTCString()})
    }
    else {
      res.json({error: "Invalid Date"})
    }

  }

})

app.get("/api/timestamp/", function (req, res){

  let date = new Date();

  res.json({unix : date.getTime(), utc: date.toUTCString()});


})



// listen for requests :)
var listener = app.listen(12345, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
