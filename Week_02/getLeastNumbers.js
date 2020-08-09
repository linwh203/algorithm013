import MaxHeap from "./heap"

/**
 * 最小的k个数
 * https://leetcode-cn.com/problems/zui-xiao-de-kge-shu-lcof/
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var getLeastNumbers = function (arr, k) {
  const newArr = arr.sort((a, b) => a - b)
  return newArr.slice(0, k)
}

/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var getLeastNumbers = function (arr, k) {
  const length = arr.length
  if (k >= length) {
    return arr
  }
  const heap = new MaxHeap(arr.slice(0, k))
  for (let i = k; i < length; ++i) {
    if (heap.top() > arr[i]) {
      heap.extract()
      heap.insert(arr[i])
    }
  }
  return heap.container
}
