/**
 * JS二叉树的三序遍历
 * https://github.com/Alex660/Algorithms-and-data-structures/blob/master/demos/%E4%BA%8C%E5%8F%89%E6%A0%91%E7%9A%84%E4%B8%89%E5%BA%8F%E9%81%8D%E5%8E%86.md
 * 前序
      根-左-右
 * 中序
      左-根-右
 * 后序
      左-右-根
 * 解法1：递归
 *  前序遍历 preOrder(r)
          print r
          preOrder(r->left)
          preOrder(r->right)
    中序遍历 inOrder(r)
          inOrder(r->left)
          print r
          inOrder(r->right)
    后序遍历 postOrder(r)
          postOrder(r->left)
          postOrder(r->right)
          print r
 *
*/

/**
 * 前序
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
  var result = []
  function pushRoot(node) {
    if (node != null) {
      result.push(node.val)
      if (node.left != null) {
        pushRoot(node.left)
      }
      if (node.right != null) {
        pushRoot(node.right)
      }
    }
  }
  pushRoot(root)
  return result
}

/**
 * 中序
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {
  var result = []
  function pushRoot(root) {
    if (root != null) {
      if (root.left != null) {
        pushRoot(root.left)
      }
      result.push(root.val)
      if (root.right != null) {
        pushRoot(root.right)
      }
    }
  }
  pushRoot(root)
  return result
}
/**
 * 后序
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function (root) {
  var result = []
  function pushRoot(node) {
    if (node != null) {
      if (node.left != null) {
        pushRoot(node.left)
      }
      if (node.right != null) {
        pushRoot(node.right)
      }
      result.push(node.val)
    }
  }
  pushRoot(root)
  return result
}
