const Main = require("./../model/Vinci");

module.exports = (io) => {
  const Vinci = new Main(io);

  io.on("connect", async (socket) => {
    await Vinci.Connect(socket);

    io.on("disconnect", () => {
      delete Vinci.sockets[socket.id];
      const room = Vinci.rooms[socket.room];
      room.players = room.players.filter((player) => player.id !== socket.id);
      io.to(room._id).emit("play", room.players.length);

      if (room.players.length <= 0) {
        delete Vinci.rooms[room._id];
      }
    });
  });
};
