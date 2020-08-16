/**
 * 全排列
 * https://leetcode-cn.com/problems/permutations/
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const res = []
  const used = {}
  dfs(res, used, nums)
  return res
}
function dfs(res, used, nums, path = []) {
  // terminator
  if (path.length === nums.length) {
    res.push(path.slice())
    return
  }
  // subProblems
  for (let num of nums) {
    if (used[num]) continue // 当前数字已经推入过数组，则不推入path，继续考察下一个数字。相比高票解答的includes方法有效减少时间复杂度
    path.push(num) // 推入path，并且递归调用dfs，继续选下一个数字，直到选满。
    used[num] = true
    // drill down
    dfs(res, used, nums, path)
    // reverse status => 回溯，path的最后一个选择被撤销，回到之前的状态，继续下一次迭代，考察上一层的别的选择。
    path.pop()
    used[num] = false
  }
}

/**
 * 高票1：
 * https://leetcode-cn.com/problems/permutations/solution/jspython-hui-su-tao-lu-mo-ban-ti-46-quan-pai-lie-b/
 */

function backtrack(list, tempList, nums) {
  if (tempList.length === nums.length) return list.push([...tempList])
  for (let i = 0; i < nums.length; i++) {
    if (tempList.includes(nums[i])) continue
    tempList.push(nums[i])
    backtrack(list, tempList, nums)
    tempList.pop()
  }
}
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const list = []
  backtrack(list, [], nums)
  return list
}

/**
 * 国际站高票1：
 * https://leetcode.com/problems/permutations/discuss/685868/DFSbacktracking-PythonJavaJavascript-PICTURE
 */
var permute = function (letters) {
  let res = []
  dfs(letters, [], Array(letters.length).fill(false), res)
  return res
}

function dfs(letters, path, used, res) {
  if (path.length == letters.length) {
    // make a deep copy since otherwise we'd be append the same list over and over
    res.push(Array.from(path))
    return
  }
  for (let i = 0; i < letters.length; i++) {
    // skip used letters
    if (used[i]) continue
    // add letter to permutation, mark letter as used
    path.push(letters[i])
    used[i] = true
    dfs(letters, path, used, res)
    // remove letter from permutation, mark letter as unused
    path.pop()
    used[i] = false
  }
}
