/**
 * N皇后
 * https://leetcode-cn.com/problems/n-queens/solution/
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  const result = []
  placeQueens(result, n)
  return result
}

function placeQueens(result, size, board = [], row = 0) {
  // terminator
  if (row === size) {
    buildResult(result, board, size) // 生成棋盘
    return
  }
  // subProblems
  for (let col = 0; col < size; col++) {
    if (
      !board.some(
        (itemCol, itemRow) =>
          itemCol === col || // 竖向
          itemCol + itemRow === col + row || // 撇向
          itemCol - itemRow === col - row // 那向
      )
    ) {
      board.push(col)
      // drill down
      placeQueens(result, size, board, row + 1)
      // reverse state => clear board to empty []
      board.pop()
    }
  }
}

function buildResult(result, board, size) {
  const boardWithQueens = board.map(
    (col) => ".".repeat(col) + "Q" + ".".repeat(size - col - 1)
  )
  result.push(boardWithQueens)
}
