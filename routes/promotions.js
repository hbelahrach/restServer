var http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser'),
    Promotions = require('../models/Promotions');

var promotionRouter = express.Router();
promotionRouter.use(bodyParser.json());

promotionRouter.route('/')
/*.all(function(req,res, next) {
    res.writeHead(200, {'Content-Type' : 'text/plain'});
    next();
})*/
.get(function(req,res, next) {
    Promotions.find({}, function(err, dishes) {
        if  (err) throw err;
        console.log("promotions found !");
        res.json(dishes);
    });
})

.post(function(req,res, next) {
    Promotions.create(req.body, function(err, dish){
        if  (err) throw err;
        res.json(dish);
    });

})

.delete(function(req,res, next) {
    console.log("I am here");
    Promotions.remove({}, function(err, dishes){
        if  (err) throw err;
        res.json(dishes);
    });
});


promotionRouter.route('/:promotionId')

.get(function(req,res, next) {
    Promotions.findById(req.params.promotionId, function(err, dish){
        if  (err) throw err;
        res.json(dish);
    });
})

.put( function(req,res, next) {
    Promotions.findByIdAndUpdate(req.params.promotionId, {$set: req.body},{ new: true}).exec(function(err, dish){
        if  (err) throw err;
        res.json(dish);
    })
})
.delete(function(req,res, next) {
    Promotions.remove("{ _id:"+req.params.promotionId+"}", function(err, dish){
        if  (err) throw err;
        res.json(dish);
    });
});

module.exports = promotionRouter;