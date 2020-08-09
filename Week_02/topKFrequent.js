/**
 * 前 K 个高频元素
 * https://leetcode-cn.com/problems/top-k-frequent-elements/
 * 利用小顶堆
 * @param {number} n
 * @return {number}
 */
let topKFrequent = function (nums, k) {
  let map = new Map(),
    heap = [,]
  nums.map((num) => {
    if (map.has(num)) map.set(num, map.get(num) + 1)
    else map.set(num, 1)
  })

  // 如果元素数量小于等于 k
  if (map.size <= k) {
    return [...map.keys()]
  }

  // 如果元素数量大于 k，遍历map，构建小顶堆
  let i = 0
  map.forEach((value, key) => {
    if (i < k) {
      // 取前k个建堆, 插入堆
      heap.push(key)
      // 原地建立前 k 堆
      if (i === k - 1) buildHeap(heap, map, k)
    } else if (map.get(heap[1]) < value) {
      // 替换并堆化
      heap[1] = key
      // 自上而下式堆化第一个元素
      heapify(heap, map, k, 1)
    }
    i++
  })
  // 删除heap中第一个元素
  heap.shift()
  return heap
}

// 原地建堆，从后往前，自上而下式建小顶堆
let buildHeap = (heap, map, k) => {
  if (k === 1) return
  // 从最后一个非叶子节点开始，自上而下式堆化
  for (let i = Math.floor(k / 2); i >= 1; i--) {
    heapify(heap, map, k, i)
  }
}

// 堆化
let heapify = (heap, map, k, i) => {
  // 自上而下式堆化
  while (true) {
    let minIndex = i
    if (2 * i <= k && map.get(heap[2 * i]) < map.get(heap[i])) {
      minIndex = 2 * i
    }
    if (2 * i + 1 <= k && map.get(heap[2 * i + 1]) < map.get(heap[minIndex])) {
      minIndex = 2 * i + 1
    }
    if (minIndex !== i) {
      swap(heap, i, minIndex)
      i = minIndex
    } else {
      break
    }
  }
}

// 交换
let swap = (arr, i, j) => {
  return ([arr[i], arr[j]] = [arr[j], arr[i]])
}

/**
 * 国际站高票题解：[hash map] [max heap] [priority queue] solution
 * https://leetcode.com/problems/top-k-frequent-elements/discuss/480532/javascript-hash-map-max-heap-priority-queue-solution
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  // results array
  let results = []

  // 1) first step is to build a hash map, where "element -> its frequency"
  // it costs O(n), where n is nums.length
  let map = {}
  nums.forEach((n) => (map[n] ? (map[n] += 1) : (map[n] = 1)))

  let pq = new PriorityQueue()
  // 2) enqueue each map element to max binary heap priority queue
  for (let key in map) {
    // it costs O(log n), where n is nums.length
    pq.enqueue(key, map[key])
  }

  // 3) k times dequeue element from priority queue and push it to results array
  for (let i = 0; i < k; i++) {
    // it costs O(log n), where n is nums.length
    results.push(pq.dequeue())
  }

  // return results array
  // as result we have O(n Log n) where n is length of nums
  return results
}

class PriorityQueue {
  constructor() {
    this._values = []
  }

  enqueue(val, priority) {
    this._values.push(new Node(val, priority))
    this._traverseUp()
  }

  dequeue() {
    const max = this._values[0]
    const end = this._values.pop()
    if (this._values.length > 0) {
      this._values[0] = end
      this._traverseDown()
    }
    return max.val
  }

  _traverseUp() {
    let idx = this._values.length - 1
    const el = this._values[idx]
    while (idx > 0) {
      let pIdx = Math.floor((idx - 1) / 2)
      let parent = this._values[pIdx]
      if (el.priority <= parent.priority) break
      this._values[pIdx] = el
      this._values[idx] = parent
      idx = pIdx
    }
  }

  _traverseDown() {
    let leftChildIdx = null
    let rightChildIdx = null
    let leftChild = null
    let rightChild = null
    let swapIdx = null

    let idx = 0
    const el = this._values[idx]
    while (true) {
      swapIdx = null
      leftChildIdx = 2 * idx + 1
      rightChildIdx = 2 * idx + 2

      if (leftChildIdx < this._values.length) {
        leftChild = this._values[leftChildIdx]
        if (leftChild.priority > el.priority) {
          swapIdx = leftChildIdx
        }
      }

      if (rightChildIdx < this._values.length) {
        rightChild = this._values[rightChildIdx]
        if (
          (swapIdx === null && rightChild.priority > el.priority) ||
          (swapIdx !== null && rightChild.priority > leftChild.priority)
        ) {
          swapIdx = rightChildIdx
        }
      }

      if (swapIdx === null) break
      this._values[idx] = this._values[swapIdx]
      this._values[swapIdx] = el
      idx = swapIdx
    }
  }
}

class Node {
  constructor(val, priority) {
    this.val = val
    this.priority = priority
  }
}

// also there is one more simple solution that actually has same time coplexity:
// O(n Log n) where n is length of nums
var topKFrequent2 = function (nums, k) {
  // results array
  let results = []

  // 1) first step is to build a hash map, where "element -> its frequency"
  // it costs O(n), where n is nums.length
  let map = {}
  nums.forEach((n) => (map[n] ? (map[n] += 1) : (map[n] = 1)))

  // 2) sort the map keys array based on its frequency
  // it costs O(log n), where n is nums.length
  let sortedKeys = Object.keys(map).sort((a, b) => map[b] - map[a])

  // 3) take first k results
  for (let i = 0; i < k; i++) {
    results.push(sortedKeys[i])
  }

  // as result we have O(n Log n) where n is length of nums
  return results
}
