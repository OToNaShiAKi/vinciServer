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
        socket.join(room._id, () => {
          this.io.to(room._id).emit("player", room.length);
        })
        return;
      }
    }

    await this.CreateRoom();
    this.JoinRoom(socket)
  }

  CreateRoom() {
    const round = Round.CreateRound();
    const room = new Room(round);
    this.rooms[room._id] = room;
  }

  async Connect(socket) {
    // socket.id是框架自动加的
    this.sockets[socket.id] = socket;

    const _id = socket.handshake.query._id;
    socket.player = await User.FindUser({ _id });

    this.JoinRoom(socket);
  }
}

module.exports = Main;
