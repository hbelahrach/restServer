var http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser'),
    Leaderships = require('../models/leadership');

var LeadershipRouter = express.Router();
LeadershipRouter.use(bodyParser.json());

LeadershipRouter.route('/')
/*.all(function(req,res, next) {
    res.writeHead(200, {'Content-Type' : 'text/plain'});
    next();
})*/
.get(function(req,res, next) {
    Leaderships.find({}, function(err, dishes) {
        if  (err) throw err;
        console.log("promotions found !");
        res.json(dishes);
    });
})

.post(function(req,res, next) {
    Leaderships.create(req.body, function(err, dish){
        if  (err) throw err;
        res.json(dish);
    });

})

.delete(function(req,res, next) {
    console.log("I am here");
    Leaderships.remove({}, function(err, dishes){
        if  (err) throw err;
        res.json(dishes);
    });
});


LeadershipRouter.route('/:leadershipId')

.get(function(req,res, next) {
    Leaderships.findById(req.params.leadershipId, function(err, dish){
        if  (err) throw err;
        res.json(dish);
    });
})

.put( function(req,res, next) {
    Leaderships.findByIdAndUpdate(req.params.leadershipId, {$set: req.body},{ new: true}).exec(function(err, dish){
        if  (err) throw err;
        res.json(dish);
    })
})
.delete(function(req,res, next) {
    Leaderships.remove("{ _id: "+req.params.promotionId+"}", function(err, dish){
        if  (err) throw err;
        res.json(dish);
    });
});

module.exports = LeadershipRouter;