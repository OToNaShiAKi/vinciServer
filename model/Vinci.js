const User = require("./../service/user");
const Round = require("./Round");

const Room = require("./Room");
const { RoundTotalPlayer, RoomStatus } = require("./../config/game");

class Main {
  constructor(io) {
    this.io = io;
    this.rooms = {};
    this.sockets = {};
    Room.io = io;
  }

  JoinRoom(socket) {
    for (let key in this.rooms) {
      const room = this.rooms[key];
      if (
        room.sockets.length < RoundTotalPlayer &&
        room.status === RoomStatus.Waiting
      ) {
        room.PlayerIn(socket);
        return;
      }
    }

    this.CreateRoom();
    this.JoinRoom(socket);
  }

  CreateRoom() {
    try {
      const round = new Round();
      const room = new Room(round);
      this.rooms[room._id] = room;
    } catch (error) {
      console.log(error);
      return this.CreateRoom();
    }
  }

  async Connect(socket) {
    const _id = socket.handshake.query._id;
    this.sockets[_id] = socket;

    const user = await User.FindUser({ _id });
    socket.player = {
      nick: user.nick,
      integral: user.integral,
      race: user.race,
      _id: user._id,
    };

    this.JoinRoom(socket);
  }
}

module.exports = Main;
