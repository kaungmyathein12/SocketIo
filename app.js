const express = require("express");
const http = require('http')
const {Server} = require('socket.io')
const app = express();
const server = http.createServer(app)
const io = new Server(server)

const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/pages/index.html");
});


io.on('connection',(socket) => {
  socket.on('chat message', (msg) => {
    const data ={
      message:msg,
      sender:socket.id,
    }
    io.emit('chat message', data);
  });
})

server.listen(port, (req, res) => {
  console.log(`Server is listening on ${port}`);
});
