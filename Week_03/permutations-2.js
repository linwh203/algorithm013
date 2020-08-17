/**
 * 全排列 II
 * https://leetcode-cn.com/problems/permutations-ii/
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
  const ret = []
  const used = {}
  dfs([])
  function dfs(path) {
    if (path.length === nums.length) {
      ret.push(path.slice())
      return
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue
      path.push(nums[i])
      used[i] = true
      dfs(path)
      path.pop()
      used[i] = false
    }
  }
  // 结果去重
  function removeRepeat(arr) {
    var hash = {}
    var result = []
    for (var i = 0, len = arr.length; i < len; i++) {
      if (!hash[arr[i]]) {
        result.push(arr[i])
        hash[arr[i]] = true
      }
    }
    return result
  }
  return removeRepeat(ret)
}

// 第一种方法从全排列的思路衍生出来，最终傻瓜式去重，时间复杂度很高。优化判断方法使其在递归前把重复的数值跳过。
var permuteUnique = function (nums) {
  const ret = []
  nums = nums.sort()
  dfs([], nums)
  function dfs(current, remaining) {
    if (!remaining.length) {
      ret.push(current)
      return
    }
    for (let i = 0; i < remaining.length; i++) {
      if (i > 0 && remaining[i] === remaining[i - 1]) continue
      current.push(remaining[i])
      dfs([...current], [...remaining.slice(0, i), ...remaining.slice(i + 1)])
      current.pop()
    }
  }
  return ret
}

/**
 * 国际站高票1：
 * https://leetcode.com/problems/permutations-ii/discuss/640499/Two-JS-Easy-Solutions-with-comments-withwo-Sorting
 * 使用Set以及set.has(element) 时间复杂度为O(1)
 * 思路还是把遇到的元素取出，遍历剩下的数组中元素，如果set中已有则跳过，set中没有则set.add，进行递归回溯
 */
var permuteUnique = function (nums) {
  let data = []
  nums = nums.sort()
  function _permute(curr, remaining) {
    if (!remaining.length) {
      data.push(curr)
      return
    }
    let uniques = new Set()
    for (let i = 0; i < remaining.length; i++) {
      if (uniques.has(remaining[i])) {
        continue
      } else {
        uniques.add(remaining[i])
        curr.push(remaining[i])
        _permute(
          [...curr],
          [...remaining.slice(0, i), ...remaining.slice(i + 1)]
        )
        curr.pop()
      }
    }
  }
  _permute([], nums)
  return data
}

/**
 * 国际站高票2：
 * https://leetcode.com/problems/permutations-ii/discuss/500633/JavaScript-Solution
 * 使用排序法
 * 1. Sort the input
 * 2. Skip duplicates to provide unique solutions
 */
var permuteUnique = function (nums) {
  nums.sort((a, b) => a - b)
  let permu = function (nums) {
    if (nums.length == 1) return [nums]
    let res = []
    for (let i = 0; i < nums.length; i++) {
      let temp = [...nums.slice(0, i), ...nums.slice(i + 1)]
      for (let c of permu(temp)) {
        res.push([nums[i], ...c])
      }
      while (nums[i + 1] == nums[i]) i++ // skip
    }
    return res
  }
  return permu(nums)
}
