/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  let ret
  if (nums.length <= 2) {
    ret = [0, 1]
  } else {
    for (let i = 0; i < nums.length - 1; i++) {
      for (let j = i + 1; j < nums.length; j++) {
        if (nums[i] + nums[j] === target) {
          ret = [i, j]
        }
      }
    }
  }
  return ret
}

// 高票回答1：
// 思路：通过差值来寻找。
// 1.用while循环从后往前遍历。
// 2.每次遍历先pop最后一个值，再通过indexOf来查找是否有对应的差，pop的好处是为了防止两个数相等。
// 3.如果有对应的值，索引就是indexOf和数组的长度。
var twoSum = function (nums, target) {
  let i = nums.length
  while (i > 1) {
    let last = nums.pop()
    if (nums.indexOf(target - last) > -1) {
      return [nums.indexOf(target - last), nums.length]
    }
    i--
  }
}
// 高票回答2，3（国际站）,思路相同，一种用es6 map 一种hash对象：
var twoSum = function (nums, target) {
  let map = new Map()

  for (let i = 0; i < nums.length; i++) {
    if (map.has(target - nums[i])) {
      return [map.get(target - nums[i]), i]
    } else {
      map.set(nums[i], i)
    }
  }
  return []
}
var twoSum = function (nums, target) {
  let hash = {}

  for (let i = 0; i < nums.length; i++) {
    const n = nums[i]
    if (hash[target - n] !== undefined) {
      return [hash[target - n], i]
    }
    hash[n] = i
  }
  return []
}
