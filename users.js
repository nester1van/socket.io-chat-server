// const users = [
//   {id: socketID, 
//   userName: ''}
// ];

class Users {
  constructor() {
    this.users = new Map();
  }
  createUser(userID) {
    this.users.set(userID, {userID, userName: ''});
  }
  readUser(userID) {
    return this.users.get(userID);
  }
  readUsers() {
    return [...this.users.values()];
  }
  updateUser(userID, userName) {
    this.users.set(userID, {userID, userName});
    return true;
  }
  deleteUser(userID) {
    return this.users.delete(userID);
  }
};

module.exports = Users;