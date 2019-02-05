//jshint esversion:6

const express = require("express");
const magellan = require("magellan-coords");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var finalCoord1 = 52.408745;
var finalCoord2 = 16.933992;

app.get("/", function(req, res) {
  res.render("home", {
    finalCoord1: magellan(finalCoord1).toDMS(),
    finalCoord2: magellan(finalCoord1).toDMS()
  });
});

app.post("/", function(req, res) {
  const coord = {
    input1: req.body.input1,
    input2: req.body.input2,
    coord1: req.body.coord1,
    coord2: req.body.coord2
  };
  if(coord.coord1 === 'dd') {
    if(coord.coord2 === 'dms') {
      res.render("home", {
        finalCoord1: magellan(coord.input1).toDMS(),
        finalCoord2: magellan(coord.input2).toDMS(),
        mapCoord1: coord.input1,
        mapCoord2: coord.input2
      });
    } else {
      res.render("home", {
        finalCoord1: magellan(coord.input1).toDD(),
        finalCoord2: magellan(coord.input2).toDD(),
        mapCoord1: magellan(coord.input1).toDD(),
        mapCoord2: magellan(coord.input2).toDD()
      });
    }
  } else if(coord.coord1 === 'dms') {
    if(coord.coord2 === 'dd') {
      res.render("home", {
        finalCoord1: magellan(coord.input1).toDD(),
        finalCoord2: magellan(coord.input2).toDD(),
        mapCoord1: magellan(coord.input1).toDD(),
        mapCoord2: magellan(coord.input2).toDD()
      });
    } else {
      res.render("home", {
        finalCoord1: magellan(coord.input1).toDMS(),
        finalCoord2: magellan(coord.input2).toDMS(),
        mapCoord1: coord.input1,
        mapCoord2: coord.input2
      });
    }
  }

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
