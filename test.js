const array = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]
const array1 = [
  [9, 8, 5],
  [6, 8, 2],
  [1, 7, 8],
  [2, 3, 7, 9, 7]
]
const array2 = [
  [7, 5, 6],
  [7, 6, 7, 8, 9]
]
const array3 = [
  [],
  [7, 5, 6],
  [],
  [7, 6, 7, 8, 9],
]

function test(matrix) {
  // matrix.map(value => value.length !== 0 && value.reverse());
  matrix.map(value =>value.reverse());
  return matrix.reverse();
}

const testMatrix = test(array);
const testMatrix1 = test(array1);
const testMatrix2 = test(array3);
console.log(testMatrix);
console.log(testMatrix1);
console.log(testMatrix2);