const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const router = require('../config/routes');

const server = express();

server.use(helmet());
server.use(cors());

server.get('/', (req, res) =>{
    res.send('<h1> Hello </h1>')
})

server.use('/api', router);

module.exports = server;
