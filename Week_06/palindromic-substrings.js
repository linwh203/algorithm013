/**
 * 647.回文子串
 * https://leetcode-cn.com/problems/palindromic-substrings/
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function (s) {
    const len = s.length
    let result = 0
    // 创建二维DP表格，默认填满false
    let dp = new Array(len)
    for (let i = 0; i < len; i++) {
        dp[i] = new Array(len).fill(false)
    }
    // 双指针i，j，从两端开始循环递推
    for (let j = 0; j < len; j++) {
        for (let i = 0; i <= j; i++) {
            // 单个字符情况
            if (i == j) {
                dp[i][j] = true
                result++
                // 两个字符的情况
            } else if (j - i == 1 && s[i] === s[j]) {
                dp[i][j] = true
                result++
                // 大于两个字符的情况
            } else if (j - i > 1 && s[i] === s[j] && dp[i + 1][j - 1]) {
                dp[i][j] = true
                result++
            }
        }
    }
    return result
};


// 降维优化空间， 状态转移DP方程见png图片
const countSubstrings = (s) => {
    const len = s.length;
    let count = 0;
    const dp = new Array(len);

    for (let j = 0; j < len; j++) {
        for (let i = 0; i <= j; i++) {
            if (j == i) {
                dp[i] = true;
                count++;
            } else if (j - i == 1 && s[i] == s[j]) {
                dp[i] = true;
                count++;
            } else if (j - i > 1 && s[i] == s[j] && dp[i + 1]) {
                dp[i] = true;
                count++;
            } else {
                dp[i] = false;
            }
        }
    }
    return count;
};

// 判断代码优化
const countSubstrings = (s) => {
    const len = s.length;
    let count = 0;
    const dp = new Array(len);

    for (let j = 0; j < len; j++) {
        for (let i = 0; i <= j; i++) {
            if (s[i] == s[j] && (j - i <= 1 || dp[i + 1])) {
                dp[i] = true;
                count++;
            } else {
                dp[i] = false;
            }
        }
    }
    return count;
};
