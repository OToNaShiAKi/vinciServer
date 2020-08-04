const Round = require("./../model/Round");

exports.CreateRound = () => {
  const date = new Date();
  const round = new Round({ start: date });
  return round;
};
