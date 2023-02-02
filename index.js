const express = require("express");

const app = express();

app.use(express.static(__dirname + "/public"));

const http = require("http").createServer(app);

const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("Connected");

  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});

http.listen(8090, () => {
  console.log("Server Listing");
});
