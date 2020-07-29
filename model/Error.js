module.exports = {
  init: ({ code = 500, message = "服务器运行错误" }) => ({
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
};
