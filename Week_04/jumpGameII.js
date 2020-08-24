/**
 * 跳跃游戏2
 * https://leetcode-cn.com/problems/jump-game-ii/
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
  let step = 0
  let canJumpMax = 0
  let lastCanJump = 0
  for (let i = 0; i < nums.length - 1; i++) {
    canJumpMax = Math.max(canJumpMax, i + nums[i])
    if (lastCanJump == i) {
      lastCanJump = canJumpMax
      step++
    }
    if (lastCanJump >= nums.length - 1) {
      break
    }
  }
  return step
}

/**
 * 高票题解：
 * https://leetcode-cn.com/problems/jump-game-ii/solution/bu-duan-zuo-chu-ju-bu-zui-you-jue-ce-zheng-qu-ba-t/
 * 不断作出局部最优决策
 * [2,3,1,1,4]
 * 1. 从第一项出发，用最少的步数跳到最后一项，从 2 出发，先跳到 1 并不是最优的选择，最优选是跳到较近的 3
 * 2. 每个点都有选择：对于 2 ，它能跳 2 步，也能跳 1 步， [3, 1] 是它的可抵达区间，它的下一跳有 2 个选择，计算这两个选择的收益，即它的下一步能跳到多远
 * 3. 选择最优解：遍历可抵达区间，求出从区间中每个点出发能跳到的最远位置，选出局部最优解
 * 4. 当遍历到可抵达区间的右端，已经知道哪个点是局部最优解，要作出选择，开始跳跃了，此时我们要更新新的可抵达区间，它由最远可抵达位置决定，同时跳跃步数+1
 *
 * 关键：
 * 遍历一个可抵达的区间，从中选出能跳最远的点，就有了新的可抵达的区间，然后跳跃一次，进入新的区间继续遍历寻求最优解
 */
var jump = function (nums) {
  let farthestPos = 0 // 记录当前能去到的最远的位置，遍历每个点都会求能跳到的最远位置，与它比较，如果把它大就更新它
  let endOfCanReach = 0
  let steps = 0
  for (let i = 0; i < nums.length - 1; i++) {
    farthestPos = Math.max(farthestPos, i + nums[i])
    if (i === endOfCanReach) {
      endOfCanReach = farthestPos // 可抵达区间的右端位置
      steps++
    }
    if (endOfCanReach >= nums.length - 1) {
      // 一旦新的可抵达区间触碰到nums数组的边界，则直接break，不用对区间的点遍历了
      break
    }
  }
  return steps
}
