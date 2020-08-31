'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const homeRouter = require('./routes/home.js');
const userRouter = require('./routes/user.js');
const chatRoomRouter = require('./routes/chatRoom.js');
const deleteRouter = require('./routes/delete.js');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));

// Routes
// app.use('/', homeRouter);
// app.use('/users', userRouter);
// app.use('/room', decode, chatRoomRouter);
// app.use('/delete', deleteRouter);


// Error Handler
app.use('*', (req, res, next) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint does not exist'
  });
});


// Start Server
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
