class Rooms {
  constructor() {
    this.rooms = [];
  }

  userJoinRoom(idAndRooms) {
    const userID = idAndRooms[0];
    this.rooms = this.rooms.filter(roomsItem => roomsItem[0] !== userID);
    this.rooms.push(idAndRooms);
    return true;
  }

  readUserIDsInRoom(roomName) {
    const roomsItem = this.rooms.filter(roomsItem => roomsItem.some(item => item === roomName))
    return roomsItem.map(item => item[0]);
  }

  readUserRoomsByUserID(userID) { 
    return this.rooms.filter(room => (room[0] === userID))[0]; 
  }

  deleteUserFromRoom(userID, roomName) {
    if (userID === roomName) return;
    this.rooms = this.rooms.map(idAndRooms => {
      if (idAndRooms[0] === userID) {
        return idAndRooms.filter(item => (item !== roomName));
      } else {
        return idAndRooms;
      }
    });
    return roomName;
  }

  deleteRoomsByUserID(userID) {
    this.rooms = this.rooms.filter(room => !(room[0] === userID));
    return userID;
  }

};

module.exports = Rooms;

