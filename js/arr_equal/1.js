// 假设我们有一个学生分数的数组
const scores = [85, 73, 92, 67, 55];

// 我们想要检查是否有任何一个学生的分数大于等于90
const hasHighScore = scores.some(score => score >= 90);

console.log(hasHighScore); // 输出: true 或 false, 取决于数组内容
console.log(scores.every(score => score >= 90));
// 再举个例子，检查是否至少有一个偶数
const numbers = [1, 3, 5, 7, 9, 2];
const hasEvenNumber = numbers.some(number => number % 2 === 0);

console.log(hasEvenNumber); // 输出: true, 因为数组中有2这个偶数