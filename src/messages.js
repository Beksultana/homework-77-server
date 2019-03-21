const express = require('express');
const nanoid = require('nanoid');
const config = require('../config');
const multer = require('multer');
const path = require('path');
const fileDb = require('../fileDb');

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, config.uploadPath);
    },
    filename: (req,file, cd) => {
        cd(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});
const router = express.Router();

router.get('/', (req, res) => {
    res.send(fileDb.getItems())
});

router.post('/', upload.single('image'), (req, res) => {
    const message = req.body;
    message.id = nanoid();
    if  (req.file) {
        message.image = req.file.filename;
    }
    if (message.author === "") {
        message.author = "Anonymous"
    }
    if (message.message === "") {
        message.message = "Anonymous"
    }
    fileDb.addItem(message);
   res.send({message: 'OK'})
});

module.exports = router;