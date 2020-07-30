module.exports = {
  init: ({ code = 1000, message = "服务器运行错误" }) => ({
    status: code,
    message,
  }),
  UserWrong: {
    status: 1001,
    message: "昵称重复或密码错误",
  },
  InfoWrong: {
    status: 1002,
    message: "手机或学号已被占用",
  },
  RankWrong: {
    status: 1003,
    message: "获取排行榜失败",
  },
  NoRank: {
    status: 1004,
    message: "排行榜尚无数据",
  },
};
