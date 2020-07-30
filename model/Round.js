const { model, Schema } = require("mongoose");

const RoundSchema = new Schema({
  first: Object,
  second: Object,
  third: Object,
  forth: Object,
  start: {
    type: Date,
    default: new Date(),
  },
  end: Date,
});

const Round = model("user", RoundSchema);

module.exports = Round;
