/**
 * 多数元素
 * https://leetcode-cn.com/problems/majority-element/description/
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  const hash = {}
  nums.forEach((n) => {
    hash[n] = hash[n] + 1 || 1
  })
  let ret = ""
  for (let k in hash) {
    if (hash[k] > nums.length / 2) {
      ret = k
    }
  }
  return ret
}

/**
 * 国际站高票1
 */
var majorityElement = function (nums) {
  // sort the array and the middle is the majority
  nums.sort((a, b) => a - b)
  return nums[Math.floor(nums.length / 2)]
}
/**
 * 国际站高票2
 */
var majorityElement = function (nums) {
  // Boyer-Moore Voting Algorithm
  let count = 0,
    candidate = 0
  for (let num of nums) {
    if (count == 0) {
      candidate = num
    }
    count += num == candidate ? 1 : -1
  }
  return candidate
}
