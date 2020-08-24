/**
 *  寻找旋转排序数组中的最小值
 *  https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array/
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
  let left = 0,
    right = nums.length - 1
  while (left < right) {
    if (nums[left] < nums[right]) {
      return nums[left]
    }
    let mid = ((left + right) / 2) >> 0
    if (nums[mid] >= nums[left]) {
      left = mid + 1
    } else {
      right = mid
    }
  }
  return nums[left]
}

/**
 * 高票题解：
 * https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array/solution/er-fen-cha-zhao-wei-shi-yao-zuo-you-bu-dui-cheng-z/
 * 思路：
 * 用二分法查找，需要始终将目标值（这里是最小值）套住，并不断收缩左边界或右边界。
    左、中、右三个位置的值相比较，有以下几种情况：
      1. 左值 < 中值, 中值 < 右值 ：没有旋转，最小值在最左边，可以收缩右边界
      2. 左值 > 中值, 中值 < 右值 ：有旋转，最小值在左半边，可以收缩右边界
      3. 左值 < 中值, 中值 > 右值 ：有旋转，最小值在右半边，可以收缩左边界
      4. 左值 > 中值, 中值 > 右值 ：单调递减，不可能出现
      分析前面三种可能的情况，会发现情况1、2是一类，情况3是另一类。

      如果中值 < 右值，则最小值在左半边，可以收缩右边界。
      如果中值 > 右值，则最小值在右半边，可以收缩左边界。
      通过比较中值与右值，可以确定最小值的位置范围，从而决定边界收缩的方向。
      而情况1与情况3都是左值 < 中值，但是最小值位置范围却不同，这说明，如果只比较左值与中值，不能确定最小值的位置范围。 
      所以我们需要通过比较中值与右值来确定最小值的位置范围，进而确定边界收缩的方向。
*/
