/**
 *
 * 有序链表转换二叉搜索树
 * https://leetcode-cn.com/problems/convert-sorted-list-to-binary-search-tree/
 *
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {ListNode} head
 * @return {TreeNode}
 */
const sortedListToBST = (head) => {
  const arr = []
  while (head) {
    arr.push(head.val)
    head = head.next
  }

  const buildBST = (start, end) => {
    if (start > end) return null
    const mid = (start + end) >>> 1 // 不会数值溢出的，Java的binarySearch源码也这么写
    const root = new TreeNode(arr[mid])
    root.left = buildBST(start, mid - 1)
    root.right = buildBST(mid + 1, end)
    return root
  }

  return buildBST(0, arr.length - 1)
}
