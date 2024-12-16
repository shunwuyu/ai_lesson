  /* 零钱兑换：贪心 */
function coinChangeGreedy(coins, amt) {
  // 假设 coins 数组有序 倒序 指向最后一个元素
  let i = coins.length - 1;
  let count = 0; // 已经使用的硬币数量
  // 循环进行贪心选择，直到无剩余金额
  while (amt > 0) { // 还要找零
      // 找到小于且最接近剩余金额的硬币
      while (i > 0 && coins[i] > amt) { // 硬币面值太大
          i--; // 继续向前找小一点的硬币
      }
      // 选择 coins[i]
      amt -= coins[i]; // 剩余金额减少， i 不变，多次使用该硬币
      count++; // 硬币数量增加
      // 如果amt 比任何一个硬币面值小，则无解 amt 不为0， 返回-1
  }
  // 若未找到可行方案，则返回 -1
  return amt === 0 ? count : -1;
}

console.log(coinChangeGreedy([1, 20, 50], 60))