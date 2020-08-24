/**
 * 岛屿数量
 * https://leetcode-cn.com/problems/number-of-islands/
 * @param {character[][]} grid
 * @return {number}
 */

var numIslands = function (grid) {
  let ret = 0
  const rows = grid.length
  if (rows === 0) return 0
  const cols = grid[0].length
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] == 1) {
        dfs(grid, i, j, rows, cols)
        ret++
      }
    }
  }
  return ret
}

function dfs(grid, i, j, rows, cols) {
  if (i < 0 || j < 0 || i > rows - 1 || j > cols - 1 || grid[i][j] == 0) return
  grid[i][j] = 0
  dfs(grid, i + 1, j, rows, cols)
  dfs(grid, i - 1, j, rows, cols)
  dfs(grid, i, j + 1, rows, cols)
  dfs(grid, i, j - 1, rows, cols)
}

/**
 * 高票解答：DFS+BFS
 * https://leetcode-cn.com/problems/number-of-islands/solution/tong-ji-wan-yi-ge-dao-hou-yao-ba-ta-chen-liao-200-/
 * 1. DFS思路：
 * 为什么需要沉岛
    遍历遇到 1 就是遇到土地，它肯定在一个岛上，统计计数 +1
    如果不把它和与它同岛的 1 变成 0，则后面重复遍历到它们时，会重复计数
  怎么找出同处一岛的所有 1
    DFS，从当前 1 为入口
    DFS 做的事情：沉岛
      将当前的 1 变 0
      当前坐标的上下左右都递归 DFS，同处一个岛的 1 都变 0
  dfs 出口：超出矩阵边界，或遇到 0，不用沉岛，直接返回
  * 2. BFS思路：
  * 遇到 1 就计数 +1
    维护一个队列，遇到 1 就让它的坐标入列
    节点出列，并考察四个方向，如果是 1，将它转为 0，并将节点入列
    如果越界了或遇到 0 ，则跳过不用入列
    出列...入列...直到没有可以入列的节点，则当前岛屿的所有 1 都转 0 了
*/
// BFS code
const numIslands = (grid) => {
  let count = 0
  let queue = []
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === "1") {
        count++
        grid[i][j] = "0" // 做标记，避免重复遍历
        queue.push([i, j])
        turnZero(queue, grid)
      }
    }
  }
  return count
}
function turnZero(queue, grid) {
  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ]
  while (queue.length) {
    const cur = queue.shift()
    for (const dir of dirs) {
      const x = cur[0] + dir[0]
      const y = cur[1] + dir[1]
      if (
        x < 0 ||
        x >= grid.length ||
        y < 0 ||
        y >= grid[0].length ||
        grid[x][y] !== "1"
      ) {
        continue
      }
      grid[x][y] = "0"
      queue.push([x, y])
    }
  }
}
