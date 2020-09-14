/**
 * 208. 实现 Trie (前缀树)
 * https://leetcode-cn.com/problems/implement-trie-prefix-tree/#/description
 * 时间复杂度：O(n)
 */

var TrieNode = function () {
  this.next = {}
  this.isEnd = false
}

/**
 * Initialize your data structure here.
 */
var Trie = function () {
  this.root = new TrieNode()
}

/**
 * Inserts a word into the trie.
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
  if (!word) return false

  let node = this.root
  for (let i = 0; i < word.length; ++i) {
    if (!node.next[word[i]]) {
      node.next[word[i]] = new TrieNode()
    }
    node = node.next[word[i]]
  }
  node.isEnd = true
  return true
}

/**
 * Returns if the word is in the trie.
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
  if (!word) return false

  let node = this.root
  for (let i = 0; i < word.length; ++i) {
    if (node.next[word[i]]) {
      node = node.next[word[i]]
    } else {
      return false
    }
  }
  return node.isEnd
}

/**
 * Returns if there is any word in the trie that starts with the given prefix.
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
  if (!prefix) return true

  let node = this.root
  for (let i = 0; i < prefix.length; ++i) {
    if (node.next[prefix[i]]) {
      node = node.next[prefix[i]]
    } else {
      return false
    }
  }
  return true
}

/**
 * class形式
 */
class TrieNode {
  constructor() {
    this.isEnd = false
    this.next = {}
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode()
  }
  insert(word) {
    if (!word) return false

    let node = this.root
    for (let i = 0; i < word.length; i++) {
      if (!node.next[word[i]]) {
        node.next[word[i]] = new TrieNode()
      }
      node = node.next[word[i]]
    }
    node.isEnd = true
    return true
  }
  search(word) {
    if (!word) return false

    let node = this.root
    for (let i = 0; i < word.length; i++) {
      if (!node.next[word[i]]) return false

      node = node.next[word[i]]
    }
    return node.isEnd
  }
  startsWith(prefix) {
    if (!prefix) return false

    let node = this.root
    for (let i = 0; i < prefix.length; i++) {
      if (!node.next[prefix[i]]) return false

      node = node.next[prefix[i]]
    }
    return true
  }
}
