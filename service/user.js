const User = require("./../model/User");

exports.FindRank = async (_id) => {
  const users = await User.find().sort({ integral: -1 }).select("_id");
  for (let index in users) {
    if (users[index]._id.toString() == _id) return index + 1;
  }
};

exports.FindUser = async (filter) => {
  const user = await User.where(filter).findOne();
  user.rank = await this.FindRank(user._id);
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
