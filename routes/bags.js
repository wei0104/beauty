var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/beauty');

router.get('/', function(req, res) {
    var collection = db.get('bags');
    collection.find({}, function(err, bags){
        if (err) throw err;
        res.json(bags);
    });
});

router.post('/', function(req, res){
    var collection = db.get('bags');
    collection.insert({
        title: req.body.title,
        description: req.body.description
    }, function(err, bag){
        if (err) throw err;

        res.json(bag);
    });
});

router.get('/:id', function(req, res) {
    var collection = db.get('bags');
    collection.findOne({ _id: req.params.id }, function(err, bag){
        if (err) throw err;

      	res.json(bag);
    });
});

router.put('/:id', function(req, res){
    var collection = db.get('bags');
    collection.update({
        _id: req.params.id
    },
    {
        title: req.body.title,
        description: req.body.description
    }, function(err, bag){
        if (err) throw err;

        res.json(bag);
    });
});

router.delete('/:id', function(req, res){
    var collection = db.get('bags');
    collection.remove({ _id: req.params.id }, function(err, bag){
        if (err) throw err;

        res.json(bag);
    });
});

module.exports = router;