const User = require("./../service/user");
const Round = require("./../service/round");

const Room = require("./Room");
const { RoundTotalPlayer } = require("./../config/game");

class Main {
  constructor(io) {
    this.rooms = {};
    this.sockets = {};
    Room.io = io;
  }

  JoinRoom(socket) {
    for (let key in this.rooms) {
      const room = this.rooms[key];
      if (room.length < RoundTotalPlayer) {
        room.PlayerIn(socket);
        return;
      }
    }

    const room = this.CreateRoom();
    this.rooms[room._id] = room;
    room.PlayerIn(socket);
  }

  CreateRoom() {
    const round = Round.CreateRound();
    const room = new Room(round);
    return room;
  }

  async Connect(socket) {
    this.sockets[socket.id] = socket;

    const _id = socket.handshake.query._id;
    socket.player = await User.FindUser({ _id });

    this.JoinRoom(socket);
  }
}

module.exports = Main;
