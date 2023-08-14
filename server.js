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

require('./models/User');
require('./models/Comment');

//Server Port
const app = require('./app.js');

const server = app.listen(3000, () => {
    console.log(`Server started at ${3000}`)
})

const io = require("socket.io")(server, {
    allowEIO3: true,
    cors: {
      origin: true,
      methods: ['GET', 'POST'],
      credentials: true
    }
});

const jwt = require("jwt-then");

const Comment = mongoose.model("Comment");
const User = mongoose.model("User");

io.use(async (socket, next) => {
    try {
      const token = socket.handshake.query.token;
      const payload = await jwt.verify(token, process.env.SECRET);
      socket.userId = payload.id;
      next();
    } catch (err) {}
});

io.on("connection", (socket) => {
    console.log("Connected: " + socket.userId);
  
    socket.on("disconnect", () => {
      console.log("Disconnected: " + socket.userId);
    });
  
    socket.on("chatboxComment", async ({ videoId, comment }) => {
      if (comment.trim().length > 0) {
        const user = await User.findOne({ _id: socket.userId });
        const newComment = new Comment({
          video: videoId,
          user: socket.userId,
          comment,
        });
        io.to(videoId).emit("newComment", {
          comment,
          name: user.name,
          userId: socket.userId,
        });
        await newComment.save();
      }
    });
});