const User = require("./../service/user");
const Round = require("./../service/round");

const Room = require("./Room");
const { RoundTotalPlayer, Waiting } = require("./../config/game");

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
      if (room.players.length < RoundTotalPlayer && room.status === Waiting) {
        room.PlayerIn(socket);
        
        return;
      }
    }

    const room = await this.CreateRoom();
    this.rooms[room._id] = room;
    this.JoinRoom(socket)
  }

  async CreateRoom() {
    const round = Round.CreateRound();
    try {
      const room = await new Room(round);
      return room;
    } catch (error) {
      console.log(error);
      return await this.CreateRoom();
    }
  }

  async Connect(socket) {
    this.sockets[socket.id] = socket;

    const _id = socket.handshake.query._id;
    socket.player = await User.FindUser({ _id });

    this.JoinRoom(socket);
  }

  InirSocketOn() {
    
  }
}

module.exports = Main;
