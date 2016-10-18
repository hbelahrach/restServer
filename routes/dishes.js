var http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser'),
    Dishes = require('../models/dishes'),
    verify = require('./verify');


var dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')

.get(verify.verifyOrdinaryUser ,function(req,res, next) {
    Dishes.find({})
    .populate('comments.postedBy')
    .exec(function (err, dish) {
        if (err) throw err;
        res.json(dish);
    })
})

.post(verify.verifyOrdinaryUser, verify.verifyAdminUser,function(req,res, next) {
    Dishes.create(req.body, function(err, dish){
        if  (err) throw err;
        res.json(dish);
    });

})

.delete(verify.verifyOrdinaryUser, verify.verifyAdminUser,function(req,res, next) {
    Dishes.remove({}, function(err, dishes){
        if  (err) throw err;
        res.json(dishes);
    });
});


dishRouter.route('/:dishId')
.get(function(req,res, next) {
    Dishes.findById(req.params.dishId)
        .populate('comments.postedBy')
        .exec(function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.put(function(req,res, next) {
    Dishes.findByIdAndUpdate(req.params.dishId, {$set: req.body},{ new: true}).exec(function(err, dish){
        if  (err) throw err;
        res.json(dish);
    })
})
.delete(function(req,res, next) {
    Dishes.remove(req.params.dishId, function(err, dish){
        if  (err) throw err;
        res.json(dish);
    });
});

dishRouter.route('/:dishId/comments')
.all(verify.verifyOrdinaryUser)

.get(function(req,res, next) {
    Dishes.findById(req.params.dishId)
     .populate('comments.postedBy')
        .exec(function (err, dish) {
        if (err) throw err;
        res.json(dish.comments);
        })
})

.post(function(req,res, next) {
    Dishes.findById(req.params.dishId, function(err, dish){
        if  (err) throw err;
        req.body.postedBy = req.decoded._doc._id;
        dish.comments.push(req.body);
        dish.save(function(err, dish){
             if  (err) throw err;
             res.json(dish);
        });
    });
})

.delete(verify.verifyAdminUser, function(req,res, next) {
    Dishes.findById(req.params.dishId, function(err, dish){
        if  (err) throw err;
        for(var i = dish.comments.length -1 ; i>= 0 ; i--){
            dish.comments.id(dish.comments[i]._id).remove();
        }
        dish.save(function(err, dish){
             if  (err) throw err;
             res.json(dish);
        });
    });
});

dishRouter.route('/:dishId/comments/:commentId')
.all(verify.verifyOrdinaryUser)

.get(function(req,res, next) {
    Dishes.findById(req.params.dishId, function(err, dish){
        if  (err) throw err;
        res.json(dish.comments.id(req.params.commentId));
    });
})

.put(function(req,res, next) {
    Dishes.findById(req.params.dishId, function(err, dish){
        if  (err) throw err;
        req.body.postedBy = req.decoded._doc._id;
        dish.comments.id(req.params.commentId).remove();
        dish.comments.push(req.body);
        dish.save(function(err, dish){
             if  (err) throw err;
             res.json(dish);
        });
    });
})
.delete(function(req,res, next) {
    Dishes.findById(req.params.dishId, function(err, dish){
        if  (err) throw err;
        console.log(dish.comments.id(req.params.commentId));
        if (dish.comments.id(req.params.commentId).postedBy
           != req.decoded._doc._id) {
            var err = new Error('You are not authorized to perform this operation!');
            err.status = 403;
            return next(err);
        }
        dish.comments.id(req.params.commentId).remove();
        dish.save(function(err, dish){
             if  (err) throw err;
             res.json(dish);
        });
    });
});

module.exports = dishRouter;