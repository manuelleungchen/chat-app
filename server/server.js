
const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const PORT = process.env.PORT || 4000;

app.use(cors());  // Add cors middleware

const server = http.createServer(app);

// Initialize an io server, pass the http server and allow for CORS from http://localhost:3000 with GET and POST methods
const socketIO = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

// let users = [];  // Storage active users

const CHAT_BOT = 'ChatBot'; // Add this

let chatRoom = ''; // E.g. javascript, node,...
let allUsers = []; // All users in current chat room

// Listen for when the client connects via socket.io-client
socketIO.on('connection', (socket) => {
    console.log(`⚡: User connected ${socket.id}`);

    // We can write our socket event listeners in here...

    // Add a user to a room
    socket.on('join_room', (data) => {
        const { username, room } = data; // Data sent from client when join_room event emitted
        socket.join(room); // Join the user to a socket room

        let __createdtime__ = Date.now(); // Current timestamp

        // Send message to all users currently in the room, apart from the user that just joined
        socket.to(room).emit('receive_message', {
            message: `${username} has joined the chat room`,
            username: CHAT_BOT,
            __createdtime__,
        });

        // Send welcome msg to user that just joined chat only
        socket.emit('receive_message', {
            message: `Welcome ${username}`,
            username: CHAT_BOT,
            __createdtime__,
        });

        // Save the new user to the room
        chatRoom = room;
        allUsers.push({ id: socket.id, username, room });
        chatRoomUsers = allUsers.filter((user) => user.room === room);
        socket.to(room).emit('chatroom_users', chatRoomUsers);
        socket.emit('chatroom_users', chatRoomUsers);
    });


    // // Listens for messages
    // socket.on('message', (data) => {
    //     socketIO.emit('messageResponse', data);
    // });

    // socket.on('typing', (data) => {
    //     socket.broadcast.emit('typingResponse', data)
    // })

    // // Listens when a new user joins the server
    // socket.on('newUser', (data) => {
    //     // Adds the new user to the list of users
    //     users.push(data);
    //     // console.log(users);
    //     // Sends the list of userrs to the client
    //     socketIO.emit('newUserResponse', users);
    // })
    // socket.on('disconnect', () => {
    //     console.log('🔥: A user disconnected');
    //     // Updates the list of users when a user disconnects from the server
    //     users = users.filter((user) => user.socketID !== socket.id);
    //     console.log(users);
    //     // Sends the list of users to the client
    //     socketIO.emit('newUserResponse', users);
    //     socket.disconnect();
    // });
});

app.get('/', (req, res) => {
    req.send('Server is up and running')
})

app.get('/api', (req, res) => {
    res.json({
        message: 'Hello world',
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
