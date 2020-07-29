const { connect, connection, disconnect } = require("mongoose");
const MongoConfig = require("../config/db").Mongo;

connect(MongoConfig, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
connection.on("open", () => {
  console.log("数据库已连接");
});
connection.on("error", (err) => {
  console.error(err);
  disconnect();
});
connection.on("close", () => {
  connect(MongoConfig, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});
