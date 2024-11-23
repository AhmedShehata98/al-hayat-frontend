export const generateVoucherId = (length = 8) => {
  const alphabetChars = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ],
    numbers = [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  let voucherCode = "";

  for (let char in alphabetChars) {
    const randomCharsIdx = Math.floor(Math.random() * alphabetChars.length - 1);
    const randomNumbersIdx = Math.floor(Math.random() * numbers.length - 1);
    if (alphabetChars[randomCharsIdx]) {
      voucherCode += alphabetChars[randomCharsIdx];
    }

    if (char >= length - 2) {
      voucherCode += numbers[randomNumbersIdx];
      break;
    }
  }

  return voucherCode;
};

export const COUPON_TYPES = new Map();
COUPON_TYPES.set(0, "One time");
COUPON_TYPES.set(1, "Multiple times");
