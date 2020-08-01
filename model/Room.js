const { RoundTotalPlayer } = require("./../config/game");

class Room {
  constructor({ _id }) {
    this._id = _id;
    this.players = [];
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
