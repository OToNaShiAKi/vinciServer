exports.RoundTotalPlayer = 4;

exports.Integral = {
  FirstIntegral: 10,
  SecondIntegral: 7,
  ThirdIntegral: 3,
  ForthIntegral: 1,
  DisconnectedIntegral: 0,
};

exports.RoomStatus = {
  Playing: 1,
  Waiting: -1,
  Done: 2,
};

const Cards = [];

for (let color of ["white", "black"]) {
  for (let i = -1; i < 12; i++) {
    Cards.push({
      color,
      value: i,
      status: false,
      belong: null,
    });
  }
}

exports.Cards = Cards;
