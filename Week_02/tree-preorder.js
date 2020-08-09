/**
 * 二叉树的前序遍历
 * https://leetcode-cn.com/problems/binary-tree-preorder-traversal/
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function (root) {
  const arr = []
  function rootPush(root) {
    if (root !== null) {
      arr.push(root.val)
      if (root.left !== null) {
        rootPush(root.left)
      }
      if (root.right !== null) {
        rootPush(root.right)
      }
    }
  }
  rootPush(root)
  return arr
}
