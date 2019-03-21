const express = require('express');
const multer = require('multer');
const path = ('path');
const fileDb = require('../fileDb');

const router = express.Router();

router.get('/', (req, res) => {
    res.send(fileDb.getItems())
});

router.post('/', (req, res) => {
    const message = req.body;
    if (message.author === ""){
        message.author = 'Anonymous';
    }
    if (message.message === ""){
        message.message = "Anonymous";
    }
    fileDb.addItem(message);
   res.send({message: 'OK'})
});

module.exports = router;