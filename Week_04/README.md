学习笔记

1. 熟练默写 DFS,BFS,二分查找模板
2. 贪心特点： 当下局部最优判断，不能回退
   回溯： 能够回退
   动态规划： 保存之前的运算结果，进行最优判断+回退

额外题目：
使用二分查找，寻找一个半有序数组 [4, 5, 6, 7, 0, 1, 2] 中间无序的地方
说明：同学们可以将自己的思路、代码写在第 4 周的学习总结中

思路：

1. 使用二分查找，判断左中右关系：
   a. 左 > 中 > 右 ，单调递减不符合题目要求
   b. 左 < 中 > 右 ，无序在右侧，收缩左边索引值
   c. 左 > 中 < 右 ，无序在左侧，收缩右边索引值
   d. 左 < 中 < 右 ，单调递增不符合题目要求

2. 判断无序的起点 -> 找到跳出循环点
   当循环中出现 左 < 右 的时候，左这个值就是无序的起点

```
var findRotateIndex = function (nums) {
  let left = 0,
    right = nums.length - 1
  while(left < right) {
    if (nums[left] < nums[right]) {
      return left
    }
    let mid = ((left + right) / 2) >> 0
    if (nums[mid] >= nums[left]) {
      left = mid + 1
    } else {
      right = mid
    }
  }
  return left
}
```
