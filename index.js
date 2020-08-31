const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const config = require('./config');

const router = require('./router');
app.use(cors());
app.use(router);

const Users = require('./users');
const users = new Users();

const Rooms = require('./rooms');
const rooms = new Rooms();

io.on('connect', (socket) => {
  console.log(`connect user ${socket.id}`);
  users.createUser(socket.id);
  console.log(users.readUsers()); 

  socket.on('users manager', ({ method, name }, callback) => {
    switch (method) {
      case 'updateUser':
        callback(users.updateUser(socket.id, name));
        console.log(users.readUsers());
        break;
      case 'getUserIdAndName':
        callback(users.readUser(socket.id));
        break;
      default:
        callback(false);
    }
  });

  // methods: createRoom, readUserIDsInRoom, deleteUserFromRoom
  socket.on('rooms manager', ({ method, roomName }, callback) => {
    switch (method) {
      case 'userJoinRoom':
        socket.join(roomName, () => {
          let IdAndRooms = Object.keys(socket.rooms);
          rooms.userJoinRoom(IdAndRooms);
          const usersInRoom = rooms.readUserIDsInRoom(roomName)
            .map(userID => users.readUser(userID));
          console.log(`usersInRoom ${roomName}`, usersInRoom);
          console.log(rooms.readUserIDsInRoom(roomName));
          io.to(roomName).emit('users in room', {roomName, usersInRoom}); 
        });
        break;
      case 'readUserIDsInRoom':
        callback(rooms.readUserIDsInRoom(roomName));
        break;
      case 'deleteUserFromRoom':
        rooms.deleteUserFromRoom(socket.id, roomName);
        const usersInRoom = rooms.readUserIDsInRoom(roomName)
          .map(userID => users.readUser(userID));
        io.to(roomName).emit('users in room', {roomName, usersInRoom});
        socket.leave(roomName);
        break;
      default: 
        callback(false);
    }
  });
  
  socket.on('chat message', 
  ({ roomName, user: {userID, userName}, message }) => {
    const date = new Date();
    console.log(date);
    io.to(roomName).emit('chat message', 
    {roomName, user: {userID, userName}, message, date}) 
  });

  socket.on('disconnect', () => {
    console.log(`disconnect user ${socket.id}`);
    const userRooms = rooms.readUserRoomsByUserID(socket.id);
    rooms.deleteRoomsByUserID(socket.id);
    userRooms.forEach(roomName => {
      const usersInRoom = rooms.readUserIDsInRoom(roomName)
            .map(userID => users.readUser(userID));
      io.to(roomName).emit('users in room', {roomName, usersInRoom});
    });
    users.deleteUser(socket.id);
    console.log(users.readUsers());
  });
});

server.listen(config.PORT, 
  () => console.log(`Server listen on port ${config.PORT}`)); 
