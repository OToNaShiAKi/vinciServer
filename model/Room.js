const { RoundTotalPlayer, Cards, RoomStatus } = require("./../config/game");

const { shuffle } = require("lodash");

class Room {
  constructor(round) {
    this.round = round;
    this._id = round._id;

    this.turn = null;
    this.status = RoomStatus.Waiting;

    this.sockets = [];

    this.Cards = shuffle(JSON.parse(JSON.stringify(Cards)));
  }

  PlayerIn(socket) {
    this.sockets.push(socket);
    socket.cards = [];
    socket.room = this._id;

    socket.join(this._id, () => {
      Room.io.to(this._id).emit("player", this.sockets.length);
    });

    this.InitOn(socket);

    if (this.sockets.length === RoundTotalPlayer) {
      this.start();
    }
  }

  InitOn(socket) {
    socket.on("ChoseCard", ({ _id, cards }) => {
      if (_id !== this.turn) return;
    });
  }

  start() {
    let players = [];
    for (let player of this.sockets) {
      players.push(player.player);
      this.GiveCard(player);
    }
    Room.io.to(this._id).emit("start", players);
    this.status = RoomStatus.Playing;

    this.ChangePlayer(0, 3);
  }

  ChangePlayer(index, chose = 1) {
    const socket = this.sockets[index];
    this.turn = socket.player;
    Room.io.to(this._id).emit("turn", {
      play: this.turn,
      chose,
    });
    this.GiveCard(socket);
  }

  ChoseCard(index) {
    const card = this.Cards[index];
    card.belong = this.turn;
    this.Cards.splice(index, 1);
    return card;
  }

  GiveCard(socket) {
    let all = this.Cards.map((card) => ({ color: card.color }));
    let other = {};
    for (let player of this.sockets) {
      if (player.id !== socket.id) {
        other[player.player._id] = player.cards.map((card) => ({
          color: card.color,
        }));
      }
    }
    socket.emit("cards", {
      all,
      other,
      mine: socket.cards,
    });
  }
}

module.exports = Room;
