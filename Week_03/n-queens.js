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
    (col) => ".".repeat(col) + "Q" + ".".repeat(queens - col - 1)
  )
  result.push(board)
}

function isValid(grid, col, row) {
  return !grid.some(
    (itemCol, itemRow) =>
      itemCol === col ||
      itemCol + itemRow === col + row ||
      itemCol - itemRow === col - row
  )
}
