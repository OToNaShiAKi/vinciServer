exports.RoundTotalPlayer = 4;

exports.FirstIntegral = 10;
exports.SecondIntegral = 7;
exports.ThirdIntegral = 3;
exports.ForthIntegral = 1;
exports.DisconnectedIntegral = 0;

exports.Playing = 1;
exports.Waiting = -1;
exports.Done = 2;

const Cards = [];

const CardStatus = false;
const CardBelong = null;

for (let color of ["white", "black"]) {
  for (let i = -1; i < 12; i++) {
    Card.push({
      color,
      value: i,
      status: CardStatus,
      belong: CardBelong,
    });
  }
}

exports.Cards = Cards;
