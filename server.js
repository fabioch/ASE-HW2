// MEAN Stack RESTful API Tutorial - Contact List App

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('carlist', ['carlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/carlist', function (req, res) {
  console.log('I received a GET request');

  db.carlist.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/carlist', function (req, res) {
  console.log(req.body);
  db.carlist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/carlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.carlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/carlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.carlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/carlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.make);
  db.carlist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {make: req.body.make, model: req.body.model, price: req.body.price, miles: req.body.miles, year: req.body.year}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(3000);
console.log("Server running on port 3000");