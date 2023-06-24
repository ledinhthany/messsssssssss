const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const server = app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Replace with the appropriate origin URL
    methods: ["GET", "POST"] // Adjust the allowed methods as needed
  }
});

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("new connection", socket.id);

  socket.on("addNewUser", (userId) => {
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });
    console.log("onlineUsers", onlineUsers);

    io.emit("getOnlineUsers", onlineUsers);
  });

  //add mess
  socket.on("sendMessage",(message) => {
    const user = onlineUsers.find((user) => user.userId === message.recipientId);


    if(user){
      io.to(user.socketId).emit( "getMessage", message );
    }
  });

  socket.on("disconnet", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);

    io.emit("getOnlineUsers", onlineUsers);
  });

});

