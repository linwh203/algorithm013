/**
 * 搜索旋转排序数组
 * https://leetcode-cn.com/problems/search-in-rotated-sorted-array/
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let left = 0,
    right = nums.length - 1
  while (left <= right) {
    let mid = (right + left) >> 1
    if (nums[mid] == target) {
      return mid
    }
    let start = nums[left],
      end = nums[right],
      midValue = nums[mid]
    if (midValue >= start) {
      if (target >= start && target < midValue) {
        right = mid - 1
      } else {
        left = mid + 1
      }
    } else {
      if (target <= end && target >= midValue) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
  }
  return -1
}

/**
 * 高票题解：
 * https://leetcode-cn.com/problems/search-in-rotated-sorted-array/solution/pythonjs-er-fen-fa-33-sou-suo-xuan-zhuan-pai-xu-sh/
 * 题目要求时间复杂度为logn，因此基本就是二分法了。 这道题目不是直接的有序数组，不然就是easy了。
  首先要知道，我们随便选择一个点，将数组分为前后两部分，其中一部分一定是有序的。
  关键点解析
    二分法
    找出有序区间，然后根据target是否在有序区间舍弃一半元素
  具体步骤：
    1. 我们可以先找出mid，然后根据mid来判断，mid是在有序的部分还是无序的部分
      假如mid小于start，则mid一定在右边有序部分。
      假如mid大于等于start， 则mid一定在左边有序部分。
      注意等号的考虑
    2. 然后我们继续判断target在哪一部分， 我们就可以舍弃另一部分了
      我们只需要比较target和有序部分的边界关系就行了。 比如mid在右侧有序部分，即[mid, end]
      那么我们只需要判断 target >= mid && target <= end 就能知道target在右侧有序部分，我们就
      可以舍弃左边部分了(start = mid + 1)， 反之亦然。
 */
var search = function (nums, target) {
  // 时间复杂度：O(logn)
  // 空间复杂度：O(1)
  // [6,7,8,1,2,3,4,5]
  let start = 0
  let end = nums.length - 1

  while (start <= end) {
    const mid = start + ((end - start) >> 1)
    if (nums[mid] === target) return mid

    // [start, mid]有序

    // ️⚠️注意这里的等号
    if (nums[mid] >= nums[start]) {
      //target 在 [start, mid] 之间

      // 其实target不可能等于nums[mid]， 但是为了对称，我还是加上了等号
      if (target >= nums[start] && target <= nums[mid]) {
        end = mid - 1
      } else {
        //target 不在 [start, mid] 之间
        start = mid + 1
      }
    } else {
      // [mid, end]有序

      // target 在 [mid, end] 之间
      if (target >= nums[mid] && target <= nums[end]) {
        start = mid + 1
      } else {
        // target 不在 [mid, end] 之间
        end = mid - 1
      }
    }
  }

  return -1
}
