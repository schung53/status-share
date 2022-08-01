const User = require('../models/user');

class UsersConnection {
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;
    this.changeStream = User.watch();

    socket.on('getUsers', () => this.getUsers());
    socket.on('disconnectUsers', () => this.disconnect());
    socket.on('connect_error', (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }

  getUsers = () => {
    this.changeStream
      .on('change', (data) => {
        this.io.sockets.emit('users', data);
      });
  }

  disconnect = async () => {
    await this.changeStream.close();
  }
}

const establishUsersStream = (io) => {
  io.on('connection', (socket) => {
    console.log('Successfully connected to users stream.');
    new UsersConnection(io, socket);
  });
}

module.exports = establishUsersStream;
