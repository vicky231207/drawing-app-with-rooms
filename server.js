const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const {v4: uuidV4} = require('uuid');
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.redirect(uuidV4())
});
app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room });
});
io.on('connection', socket => {
    console.log(`A user has connected! ${socket.id}`);
    socket.on('disconnect', () => {
        console.log(`A user has disconnected! ${socket.id}`);
    });
    socket.on('draw', e => {
        socket.join(e.ROOM_ID)
        socket.broadcast.to(e.ROOM_ID).emit('draw', e);
    });
    socket.on('join', e => {
        socket.join(e);
    })
});
server.listen(8080);