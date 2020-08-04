const User = require("./../model/User");

const Rank = {
  integral: -1,
  "race.first": -1,
  "race.second": -1,
  "race.third": -1,
  "race.forth": -1,
  created: 1,
};

exports.FindRank = async (_id) => {
  const users = await User.find().sort(Rank).select("_id");
  for (let index in users) {
    if (users[index]._id.toString() == _id) return Number(index) + 1;
  }
};

exports.FindUser = async (filter) => {
  const user = await User.where(filter).findOne();
  if (user) user.rank = await this.FindRank(user._id);
  return user;
};

exports.CreateUser = async (nick, password) => {
  const user = new User({ nick, password });
  const result = await user.save();
  result.rank = await this.FindRank(result._id);
  return result;
};

exports.UpdateInfo = async (info) => {
  const user = await User.findById(info._id);
  user.phone = info.phone;
  user.name = info.name;
  user.uid = info.uid;
  await user.save();
};

exports.AllRank = async () => {
  const users = await User.find({ integral: { $ne: 0 } })
    .sort(Rank)
    .select("nick integral uid race");
  return users;
};
