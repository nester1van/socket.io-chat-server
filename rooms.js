const { use } = require("./router");
const e = require("express");

class Rooms {
  constructor() {
    this.rooms = [];
  }
  // fixed
  userJoinRoom(idAndRooms) {
    const userID = idAndRooms[0];
    this.rooms = this.rooms.filter(roomsItem => roomsItem[0] !== userID);
    this.rooms.push(idAndRooms);
    // if (this.rooms.some(room => {
    //   return room.userID === userID && room.roomName === roomName;
    // })) return false;
    // this.rooms.push({userID, roomName});
    return true;
  }
  // fixed
  readUserIDsInRoom(roomName) {
    const roomsItem = this.rooms.filter(roomsItem => roomsItem.some(item => item === roomName))
    return roomsItem.map(item => item[0]);
    // return this.rooms.filter(room => room.roomName === roomName);
  }
  // [[id1, room1, room2], [id2, room2]] 
  deleteUserFromRoom(userID, roomName) {
    this.rooms = this.rooms.map(idAndRooms => {
      if (idAndRooms[0] === userID) {
        return idAndRooms.filter(item => (item !== roomName));
      } else {
        return idAndRooms;
      }
    })
    this.rooms = this.rooms.filter(room => {
      return !(room.roomName === roomName && room.userID === userID)
    });
    return roomName;
  }
  // fixed
  deleteRoomsByUserID(userID) {
    this.rooms = this.rooms.filter(room => !(room[0] === userID));
    return userID;
  }

};

module.exports = Rooms;

// const rooms = [
//   ['id1', 'room1', 'room2', 'room3'],
//   ['id2', 'room2']
// ];


// let rooms1 = new Rooms();

// rooms1.userJoinRoom(rooms[0]);
// rooms1.userJoinRoom(rooms[1]);

// console.log('rooms1.rooms', rooms1.rooms);
// // [ [ 'id1', 'room1', 'room2', 'room3' ], [ 'id2', 'room2' ] ]

// console.log('rooms1.readUserIDsInRoom("room2")', rooms1.readUserIDsInRoom('room2'));
// // [ 'id1', 'id2' ]
 
// rooms1.deleteUserFromRoom('id1', 'room1')

// console.log('deleteUserFromRoom rooms1', rooms1);
// // [ [ 'id1', 'room2', 'room3' ], [ 'id2', 'room2' ] ]

// rooms1.deleteRoomsByUserID('id1');

// console.log('rooms1', rooms1);
// // [ [ 'id2', 'room2' ] ]
