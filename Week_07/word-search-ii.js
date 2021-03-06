/**
 * 212. 单词搜索 II
 * https://leetcode-cn.com/problems/word-search-ii/
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function (board, words) {
  // 构建字典树
  class TrieNode {
    constructor() {
      this.END = false
      this.children = new Array(26)
    }
    containsKey(letter) {
      return this.children[letter.charCodeAt() - 97] != undefined
    }
    put(letter, newTrieNode) {
      this.children[letter.charCodeAt() - 97] = newTrieNode
    }
    getNext(letter) {
      return this.children[letter.charCodeAt() - 97]
    }
    setEnd() {
      this.END = true
    }
    isEnd() {
      return this.END
    }
  }
  let root = null
  let Trie = function () {
    root = new TrieNode()
  }
  Trie.prototype.insert = (word) => {
    let currNode = root
    for (let i = 0; i < word.length; i++) {
      if (!currNode.containsKey(word[i])) {
        currNode.put(word[i], new TrieNode())
      }
      currNode = currNode.getNext(word[i])
    }
    currNode.setEnd()
  }
  let searchPrefix = (word) => {
    let currNode = root
    for (let i = 0; i < word.length; i++) {
      if (currNode.containsKey(word[i])) {
        currNode = currNode.getNext(word[i])
      } else {
        return null
      }
    }
    return currNode
  }
  Trie.prototype.search = (word) => {
    let currNode = searchPrefix(word)
    return currNode != null && currNode.isEnd()
  }
  Trie.prototype.startsWith = (prefix) => {
    let currNode = searchPrefix(prefix)
    return currNode != null
  }
  // 初始化变量
  let m = board.length
  let n = board[0].length
  // 初始化字典树
  let wordsTrie = new Trie()
  for (let i = 0; i < words.length; i++) {
    wordsTrie.insert(words[i])
  }
  // 搜索方向向量
  let dx = [-1, 1, 0, 0]
  let dy = [0, 0, -1, 1]
  // DFS 搜索
  let boardDFS = (i, j, curStr) => {
    let restore = board[i][j]
    curStr += restore
    // 字典树中找到了
    if (wordsTrie.search(curStr) && result.indexOf(curStr) == -1) {
      result.push(curStr)
    }
    // 减枝 - 拼接字符判断是否存在于字典树中，如果前缀都不是，直接false
    if (!wordsTrie.startsWith(curStr)) {
      return
    }
    // 前进
    board[i][j] = "#"
    for (let r = 0; r < 4; r++) {
      let tmp_i = dx[r] + i
      let tmp_j = dy[r] + j
      // 边界情况处理
      if (
        tmp_i >= 0 &&
        tmp_i < m &&
        tmp_j >= 0 &&
        tmp_j < n &&
        board[tmp_i][tmp_j] != "#"
      ) {
        boardDFS(tmp_i, tmp_j, curStr)
      }
    }
    // 还原(回溯)
    board[i][j] = restore
  }
  // 寻找结果
  let result = []
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      boardDFS(i, j, "")
    }
  }
  return result
}

/**
 * 国际站：
 * https://leetcode.com/problems/word-search-ii/discuss/138279/Clean-JavaScript-solution
 */
const findWords = (board, words) => {
  const dirs = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ]
  let res = []

  const buildTrie = () => {
    const root = {}
    for (const w of words) {
      let node = root
      for (const c of w) {
        if (node[c] == null) node[c] = {}
        node = node[c]
      }
      node.word = w
    }
    return root
  }

  const search = (node, x, y) => {
    if (node.word != null) {
      res.push(node.word)
      node.word = null // make sure only print one time for each word
    }

    if (x < 0 || x >= board.length || y < 0 || y >= board[0].length) return
    if (node[board[x][y]] == null) return

    const c = board[x][y]
    board[x][y] = "#" // Mark visited
    for (const [dx, dy] of dirs) {
      const i = x + dx
      const j = y + dy
      search(node[c], i, j)
    }
    board[x][y] = c // Reset
  }

  const root = buildTrie()
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      search(root, i, j)
    }
  }
  return res
}
