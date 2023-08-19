require('dotenv').config();

//MongoDB Connection
const mongoStr = process.env.DATABASE_URL
const mongoose = require('mongoose');

mongoose.connect(mongoStr);
const database = mongoose.connection;

database.on('error', (error) => {
    console.error(error)
})

database.once('connected', () => {
    console.log('Database Connected')
})

//Server Port
const http = require('http');
const socketIo = require('socket.io');

const app = require('./app.js');
const server = http.createServer(app);
const io = socketIo(server);

const Comment = require('./models/Comment.js');

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (message) => {
    io.emit('chat message', message);
  });

  socket.on('comment', (data) => {
    const newComment = new Comment({
      video: data.videoId,
      username: data.username,
      comment: data.comment,
    });

    newComment.save().then(() => {
      io.emit('comment', newComment);
    });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

app.listen(3000, () => {
    console.log(`Server started at ${3000}`)
});