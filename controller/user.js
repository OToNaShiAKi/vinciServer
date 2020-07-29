const User = require("./../service/user");

const ErrorCode = require("./../model/Error");

const md5 = require("blueimp-md5");
const salt = ["S&T.", "hustmaths"];

exports.Account = async (info) => {
  const nick = info.nick;
  const password = md5(salt[0] + info.password + salt[1]);
  try {
    const user = await User.FindUser({ nick });
    if (!user) {
      const create = await User.CreateUser(nick, password);
      return {
        status: 200,
        message: "注册成功",
        data: create,
      };
    }
    if (user.password !== password) return ErrorCode.UserWrong;
    else
      return {
        status: 200,
        message: "登录成功",
        data: user,
      };
  } catch (err) {
    return ErrorCode.init(err);
  }
};

exports.Info = async (info) => {
  try {
    const user = await User.FindUser({
      $or: [{ phone: info.phone }, { uid: info.uid }],
      _id: { $ne: info._id },
    });
    if (user) return ErrorCode.InfoWrong;
    else {
      await User.UpdateInfo(info);
      return {
        status: 200,
        message: "填写成功",
      };
    }
  } catch (err) {
    return ErrorCode.init(err);
  }
};
