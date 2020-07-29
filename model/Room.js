const { RoundTotalPlayer } = require("./../config/game");

const Turn = 1;
const Wait = -1;
const Disconnect = 0;
const Done = 2;

class Room {
  constructor(_id, players) {
    this._id = _id;
    this.players = players;
  }

  PlayerIn(player) {
    this.players.push(player);
    player.game = { status: Wait };

    Room.io.to(this._id).emit("join", player);
    if (this.players.length === RoundTotalPlayer) {
      this.start();
    }
  }

  start() {
    Room.io.to(this._id).emit("start");
  }

  over() {
    Room.io.to(this._id).emit("over");
  }
}

module.exports = Room;
