const Main = require("./../model/Vinci");

module.exports = (io) => {
  const Vinci = new Main(io);
  Vinci.io = io;

  io.on("connect", async (socket) => {
    await Vinci.Connect(socket);
  });
};
