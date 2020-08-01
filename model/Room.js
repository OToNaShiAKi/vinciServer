const {
  RoundTotalPlayer,
  Cards,
  Waiting,
  Playing,
} = require("./../config/game");

const Round = require("./../service/round");
const Main = require("./Vinci");

const { shuffle } = require("lodash");

class Room {
  constructor(round) {
    this.round = round;
    this._id = round._id;
    this.turn = null;
    this.status = Waiting;
    this.sockets = [];

    this.Cards = shuffle(JSON.parse(JSON.stringify(Cards)));
  }

  PlayerIn(socket) {
    this.sockets.push(socket);
    socket.room = this._id;

    socket.join(this._id, () => {
      Room.io.to(this._id).emit("player", this.sockets.length);
    });

    if (this.sockets.length === RoundTotalPlayer) {
      this.start();
    }
  }

  start() {
    Room.io.to(this._id).emit("start");

    for (let player of this.sockets) {
      player.cards = [];
      for (let i = 0; i < 3; i++) {
        const card = this.ChoseCard();
        card.belong = player.player._id;
        player.cards.push(card);
      }
      Room.io.to(this._id).emit("card", player.cards);
    }
    this.status = Playing;
    this.ChangePlayer(0);
  }

  ChangePlayer(index) {
    const socket = this.sockets[index];

    this.turn = socket.id;
  }

  ChoseCard() {
    return this.Cards.pop();
  }

  over() {
    Room.io.to(this._id).emit("over");
  }
}

module.exports = Room;
