/**
 * 二叉树的中序遍历
 * https://leetcode-cn.com/problems/binary-tree-inorder-traversal/
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
var inorderTraversal = function (root) {
  const arr = []
  function pushRoot(root) {
    if (root !== null) {
      if (root.left !== null) {
        pushRoot(root.left)
      }
      arr.push(root.val)
      if (root.right !== null) {
        pushRoot(root.right)
      }
    }
  }
  pushRoot(root)
  return arr
}

// 高票解法：https://leetcode-cn.com/problems/binary-tree-inorder-traversal/solution/di-gui-fa-he-die-dai-fa-tong-yong-qian-zhong-hou-x/
var inorderTraversal = function (root) {
  if (root) {
    return [
      ...inorderTraversal(root.left),
      root.val,
      ...inorderTraversal(root.right),
    ]
  } else {
    return []
  }
}
