const express = require('express')
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server);
const port = process.env.PORT || 4000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index.html');
});

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);
  socket.on('message', (message) => {
    const id = socket.id;
    io.emit('send-message', {id,message});
  })
  socket.on('disconnect', () => {
    console.log(`User Disconnected: ${socket.id}`);
  })
})

server.listen(port, () => {
  console.log(`Server Working On Port: ${port}`);
})