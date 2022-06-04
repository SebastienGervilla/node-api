const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const ObjectID = require('mongoose').Types.ObjectId;

const { PostsModel } = require('../models/postsModel');


// Get
router.get('/', (req, res) => {
    PostsModel.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log("Error to get data : " + err);
    });
});

// Post
router.post('/', (req, res) => {
    const NewRecord = new PostsModel({
        author: req.body.author,
        message: req.body.message
    });

    NewRecord.save((err, docs) => {
        if (!err) res.send(docs);
        else console.log("Error creating new data : " + err);
    });
});

// Update
router.put('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("Unknown ID : " + req.params.id);
    
    const updateRecord = {
        author: req.body.author,
        message: req.body.message
    };

    PostsModel.findByIdAndUpdate(
        req.params.id,
        { $set: updateRecord },
        { new: true },
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Update error : " + err);
        }
    );
});

// Delete
router.delete('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("Unknown ID : " + req.params.id);

    PostsModel.findByIdAndDelete(
        req.params.id,
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Deleting error : " + err);
        }
    );
});

module.exports = router;