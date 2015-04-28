/**
 * Created by Max on 4/27/2015.
 */
var http = require('http');
var Queue = require('bull');
var mongoose = require('mongoose');
var Job = require('./jobModel');
var jobQueue = new Queue('Get Server Value', 6379, '127.0.0.1');

var getData = function (url, id) {
    var request = http.request(url, function (res) {
        var data = '';
        res.on('data', function (chunk) {
            console.log('Working...');
            data += chunk;
        });
        res.on('end', function () {
            console.log('Updating ' +id+' with ' +data);
            Job.findOne({ _id: id }, function (err, doc){
                doc.done = true;
                doc.data = data;
                doc.save();
            });
        });
    });
    request.on('error', function (e) {
        console.log(e.message);
    });
    request.end();
};

jobQueue.process(function (job, done) {
    console.log('In progress, wait plz...');
    getData(job.data.url, job.data.id);
    done(console.log('Done! Yes!'));
});

exports.addJob = function (data) {
    Job.create({url: data}, function (err, job) {
            if (err) console.log(err);
            var ID = job._id;
            jobQueue.add({url: data, id: ID}).then(function (data) {

                console.log('Yay! Job Added with the id of: ' + data.jobId);
            }, function (err) {
                console.error('Job failed to add, aww');
                console.error(err);
            });
        }
    );
};

exports.findAll = function(){
    console.log('Find All');
    var jobAll = Job.find({}).exec();
    return jobAll;
};


exports.findSolo = function(id){
    console.log('Find One');
    var jobOne = Job.findOne({_id: id}).exec();
    return jobOne;
};


exports.deleteJob = function(id){
    console.log('Recived ID: '+id);
    Job.findOne({_id: id}).remove(function(){

    });
};