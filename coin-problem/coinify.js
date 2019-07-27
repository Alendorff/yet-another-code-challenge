/**
 * Splits passed amount of money to minimal count of euro coins
 * @param {number} amount
 * @return {Array<number>} represents coins
 */
module.exports.coinify = function coinify(amount) {
  if (amount < 0 || typeof amount !== "number") {
    throw new TypeError(
      `Invalid argument amount = ${amount}. Must be a number >= 0.`
    );
  }

  // 2€, 1€, 50¢, 20¢, 10¢, 5¢, 2¢, 1¢
  const coins = [200, 100, 50, 20, 10, 5, 2, 1];
  const result = []
  let amountInCents = amount * 100

  while (amountInCents >= coins[coins.length - 1]) {
    const nextCoin = coins.find((c) => c <= amountInCents)
    result.push(nextCoin)
    amountInCents = amountInCents - nextCoin
  }

  return result.map((value) => parseFloat((value / 100).toFixed(2)))
}