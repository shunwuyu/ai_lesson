function spiralOrder(matrix) {

  if (matrix.length === 0) return [];
  
  let res = [];
  
  let top = 0, bottom = matrix.length - 1;
  
  let left = 0, right = matrix[0].length - 1;
  
  while (top <= bottom && left <= right) {
  
  // 从左到右遍历顶行
  
  for (let i = left; i <= right; i++) {
  
  res.push(matrix[top][i]);
  
  }
  
  top++;
  
  if (top > bottom) break;
  
  // 从上到下遍历右列
  
  for (let i = top; i <= bottom; i++) {
  
  res.push(matrix[i][right]);
  
  }
  
  right--;
  
  if (left > right) break;
  
  // 从右到左遍历底行
  
  for (let i = right; i >= left; i--) {
  
  res.push(matrix[bottom][i]);
  
  }
  
  bottom--;
  
  if (top > bottom) break;
  
  // 从下到上遍历左列
  
  for (let i = bottom; i >= top; i--) {
  
  res.push(matrix[i][left]);
  
  }
  
  left++;
  
  }
  
  return res;
  
}

console.log(spiralOrder([[1,2,3],[4,5,6],[7,8,9]]))