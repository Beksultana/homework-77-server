const express = require('express');
const fileDb = require('./fileDb');
const messages = require('./src/messages');
const cors = require('cors');
const app = express();
fileDb.init();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const port = 10000;

app.use('/messages', messages);

app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
});