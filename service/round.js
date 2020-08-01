const Round = require("./../model/Round");

exports.CreateRound = async (date) => {
  const round = await new Round({ start: date });
  const result = round.save();
  return result;
};
