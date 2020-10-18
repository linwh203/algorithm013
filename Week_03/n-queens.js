/**
 * N皇后
 * https://leetcode-cn.com/problems/n-queens/solution/
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  const result = []
  backTrack(result, n)
  return result
}

function backTrack(result, queens, grid = [], row = 0) {
  if (row === queens) {
    buildBoard(result, queens, grid)
    return
  }
  for (let col = 0; col < queens; col++) {
    if (isValid(grid, col, row)) {
      grid.push(col)
      backTrack(result, queens, grid, row + 1)
      grid.pop()
    }
  }
}

function buildBoard(result, queens, grid) {
  const board = grid.map(
    (col) => ".".repeat(col) + "Q" + ".".repeat(queens - 1 - col)
  )
  result.push(board)
}

function isValid(grid, col, row) {
  // 攻击线上是否后皇后
  return !grid.some(
    (itemCol, itemRow) =>
      itemCol === col || // 竖向有皇后
      itemCol + itemRow === col + row || // 撇向有皇后
      itemCol - itemRow === col - row // 那向有皇后
  )
}
