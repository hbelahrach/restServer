var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../config.js');

exports.getToken = function(user){
    return jwt.sign(user, config.secretKey,{
        expiresIn : 3600
    });
};

exports.verifyOrdinaryUser = function(req, res, next){

    var token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (token) {
        jwt.verify(token, config.secretKey, function(err, decoded){
            if (err){
                var err = new Error("You are not authenticated");
                err.status = 401;
                return next(err);
            }else{
                req.decoded = decoded;
                next();
            }
        })
    }else{
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};

exports.verifyAdminUser = function(req, res, next){
        console.log("HAppened to be here")
        console.log(req.decoded);
        if(req.decoded._doc){
            if(req.decoded._doc.admin == true){
                console.log("HAppened to be here 2")
                next()
            }else{
               var err = new Error('Forbidden');
               err.status = 403;
               return next(err); 
            }
        }else{
            var err = new Error('Not Authenticated');
            err.status = 401;
            return next(err);
        }
};

