'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


const startServer = (port, mongodb) => {
  let options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }

  mongoose.connect(mongodb, options);
  app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
  })
}


app.get('/', (req, res, next) => {
  res.send('HELLO FROM THE HOME ROUTE');
});


module.exports = {
  server: app,
  start: startServer,
}
