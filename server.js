const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const alorigin =ENV.origin;
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: alorigin,
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("offer", (offer) => {
        socket.broadcast.emit("offer", offer);
    });

    socket.on("answer", (answer) => {
        socket.broadcast.emit("answer", answer);
    });

    socket.on("candidate", (candidate) => {
        socket.broadcast.emit("candidate", candidate);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

server.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
