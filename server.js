var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var job = require('./public/jobScripts/jobHandler');
var formatter = require('./public/jobScripts/urlFormatter');
var url = require('url');

mongoose.connect('mongodb://localhost/Massdrop');

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));
app.use(bodyParser.json());
app.use(function (error, req, res, next) {
  if (!error) {
    next();
  } else {
    console.error(error.stack);
    res.send(500);
  }
});

app.get('/jobs', function (req, res) {
  job.findAll().then(function(jobs){
    res.json(jobs);
  });
});

app.post('/jobs', function (req, res) {
  console.log(req.body);
  var formattedUrl = formatter(req.body.url);
  console.log(formattedUrl);
  job.addJob(formattedUrl);
});

app.delete('/jobs/:id', function (req, res) {
  var id = req.params.id;
  console.log('ID to delete: '+id);
  job.deleteJob(id);
});

app.get('/jobs/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  job.findSolo(id).then(function(job){
      res.send(job.data);
  });
});

app.listen(3000);
console.log("Server running on port 3000");