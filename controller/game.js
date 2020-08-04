const Main = require("./../model/Vinci");
const { RoomStatus } = require("./../config/game");
const { AlreadyMatch } = require("./../model/Error");

module.exports = (io) => {
  const Vinci = new Main(io);

  io.on("connect", async (socket) => {
    const _id = socket.handshake.query._id;

    if (Vinci.sockets[_id]) {
      socket.emit("message", AlreadyMatch);
      return;
    }

    await Vinci.Connect(socket);

    socket.on("disconnect", () => {
      delete Vinci.sockets[_id];
      const room = Vinci.rooms[socket.room];
      room.sockets = room.sockets.filter((player) => player.id !== socket.id);
      io.to(room._id).emit("player", room.sockets.length);

      if (room.sockets.length <= 0) {
        room.status !== RoomStatus.Waiting && room.round.save();
        delete Vinci.rooms[room._id];
      }
    });
  });
};
