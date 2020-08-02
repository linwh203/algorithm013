/**
 * @param {number[]} height
 * @return {number}
 * 思路：
 * 循环遍历元素，每个元素的接水量相当于两边最大高度的较小值减去当前元素高度(Math.min(leftMax[i],rightMax[i])-height[i]),进行累加
 */
var trap = function (height) {
  let total = 0
  height.forEach((h, index) => {
    let leftMax = 0,
      rightMax = 0
    for (let i = 0; i <= index; i++) {
      leftMax = Math.max(height[i], leftMax)
    }
    for (let i = index; i < height.length; i++) {
      rightMax = Math.max(height[i], rightMax)
    }
    total += Math.min(leftMax, rightMax) - h
  })
  return total
}

// 高票最优解：双指针
// 双指针去找两边最大高度，使用变量储存“左最大值”和“右最大值”
var trap = function (height) {
  if (!height || height.length < 3) return 0
  let left = 0,
    right = height.length - 1 // 定义左下标与右下标
  let leftMax = 0,
    rightMax = 0 // 定义左最大值与右最大值
  let sum = 0
  while (left < right) {
    leftMax = Math.max(leftMax, height[left]) // 更新左最大值
    rightMax = Math.max(rightMax, height[right]) // 更新右最大值
    // sum只与左最大值和右最大值中较小的那个有关
    if (leftMax <= rightMax) {
      sum += leftMax - height[left]
      left++
    } else {
      sum += rightMax - height[right]
      right--
    }
  }
  return sum
}
