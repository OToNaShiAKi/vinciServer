const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  nick: {
    type: String,
    required: true,
    minlength: 1,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 32,
    maxlength: 32,
  },
  name: {
    type: String,
    minlength: 2,
  },
  phone: {
    type: String,
    match: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,
  },
  uid: {
    type: String,
    match: /^U20[1|2]\d{6}$/,
  },
  integral: {
    type: Number,
    default: 0,
    min: 0,
  },
  race: {
    type: {
      first: {
        type: Number,
        min: 0,
      },
      second: {
        type: Number,
        min: 0,
      },
      third: {
        type: Number,
        min: 0,
      },
      forth: {
        type: Number,
        min: 0,
      },
    },
    default: {
      first: 0,
      second: 0,
      third: 0,
      forth: 0,
    },
  },
  rank: {
    type: Number,
    min: 1,
  },
  created: {
    type: Date,
    default: new Date(),
  },
});

const User = model("user", UserSchema);

module.exports = User;
