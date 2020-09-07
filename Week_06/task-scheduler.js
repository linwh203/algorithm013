/**
 * 621. 任务调度器
 * https://leetcode-cn.com/problems/task-scheduler/
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function (tasks, n) {
    const len = tasks.length
    const map = new Map()
    let maxVal = 0
    let maxValCount = 0
    for (let k of tasks) {
        let taskVal = map.has(k) ? map.get(k) + 1 : 1
        map.set(k, taskVal)
        if (taskVal > maxVal) {
            maxVal = taskVal
            maxValCount = 1
        } else if (taskVal == maxVal) {
            maxValCount++
        }
    }
    return Math.max(tasks.length, (maxVal - 1) * (n + 1) + maxValCount)
};

/**
 * 填桶任务
 * https://leetcode-cn.com/problems/task-scheduler/solution/tian-tong-si-lu-you-tu-kan-wan-jiu-dong-by-mei-jia/
 *  要算出最短时间，就要思考如何安排任务可以得到最短时间
    首先算出每个任务的个数，并排序。接着当然是安排个数最大的任务，并且附带间隔，这个过程类型填桶的过程
    1）
    假设有 5 个 A，5 个 B， 2 个 C
    注意：桶并不是完整的矩形，最后一行由 max count 决定！！
    摆列顺序：先放任务个数大的，再放小的；从上到下，从左到右放，如图（ - 代表待命）。
    执行顺序：左到右，上到下 （见图1）

    分析可行性：由于高度是最大值，不可能存在同一行出现相同的任务，而宽度为 n + 1，符合要求，最短时间很明显主要由最后一行的个数（maxCount）决定
    最短时间：(n + 1) * (max - 1) + maxCount，也就是桶的大小

    2）
    假设有 5 个 A，5 个 B， 3 个 C，2 个 D，2 个 E，2 个 F，1 个 G
    摆放顺序：在前面的基础上，桶不够时往桶右边补，顺序仍然是从上到下，从左到右放，如图（浅色部分是桶外）
    执行顺序：左到右，上到下（见图2）

    分析可行性：由于高度是最大值，不可能存在同一行出现相同的任务，而宽度大于等于 n + 1，符合要求。由于不含待命格子，最短时间很明显由总任务个数决定。
    最短时间：tasks.length

    小结
    回过头来看，其实两种差别不大，任务的摆放和执行顺序基本一致
    摆放顺序：先摆放任务个数多的，从上到下，从左到右摆放
    执行顺序：左到右，上到下
    最短时间：在填不满桶时，最短时间为 (n + 1) * (max - 1) + maxCount，也就是桶的大小；
             在桶放不下时，最短时间是tasks.length。综合起来就是它两的最大值。
             思路一如果 maxCount > n + 1，由于宽度早已溢出，此时都不需要有填桶这个概念了，你可以直接把这种情况归为思路二
 */

/**
 * 国际站高票
 * https://leetcode.com/problems/task-scheduler/discuss/401103/simple-Javascript-idle-slots-1-pass-with-detailed-description
 * 
Concepts: The result value can be calculated by determining the task(s) that occur(s) most often. First let's consider the case where there is just 1 task that occurs most often, in this case, 'B'

Case 1: [A, B, B, C] n=2
The shortest solution would be [B, A, C, B]
Notice how the solution isn't something like [A, B, C, _, B]. We've spaced out the most occuring task (B) as wide as possible in the array, by having it be at the beginning and end.

Case 2: [A, B, B, C, C] n = 2
Consider this, where there are multiple tasks that occur most often (B and C). The solution is essentially the same as Case 1, but with both of our max occuring tasks (B, C) spread out as much as possible, at the beginning and end, with the A in the middle.
Shortest solution: [B, C, A, B, C]

Case 3: [A, B, C, C, C] n=2
If we consider the case where the number of occurrences for the max tasks is 3, we can see that a pattern shows itself.
Shortest solution: [C, A, _, C, B, _, C]
C will always have 2 spaces between it, and we try to fill it in with the other tasks. From this, we can see that the solution is a multiple of the max number of occurences - 1.

What if n = 3?

Case 4: [A, B, B, C] n = 3
For the first example [A, B, B, C], we'll do the same as before by spreading out the most occurring task, but in order to satisfy the n=3 spacing, we will have to put 1 space somewhere in between (it doesn't matter where).
Solution => [B, A, C, _, B]

We can start to see a pattern here, and thus, we can create a formula to determine the answer!

in short, the formula is...
resultCount = (maxOccurrences - 1) * (n + 1) + (numMaxTasks);

Let's break this down...

maxOccurences - 1
As seen in case 3, we know that we need to multiply times maxOccurences. We must subtract 1 because we dont need to have any empty spaces or filling after the last occurence, at the end.

(n + 1)
We need to multiply times n+1 because there will always be n spaces in between, which when multiplying, would not be including the actual task if we were to not add 1.

+maxNumTasks
This is to consider the case where there is more than 1 task that needs to be appended at the end, such as in Case 2.

Edge cases
It's possible that there is more than enough "filler" tasks to complete.
Consider [A, B, C, C, D, E, F, G] where n = 2;

Using our formula, our answer would be 4. Clearly this isn't correct because there are more than 4 tasks in the starting array!
Thus, we can just return the length of the initial array.

Solution
*/
/**
 * @param {array[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function (tasks, n) {
    // the map will be our tracking mechanism
    let m = new Map();

    // the max occurrences
    let maxVal = 0;

    // the number of tasks that has the max occurrences
    let maxValCount = 0;

    for (let k of tasks) {
        let tVal = m.has(k) ? m.get(k) + 1 : 1;
        m.set(k, tVal);
        // set our maxVal and number of maxVal tasks only if we have a new max
        if (tVal > maxVal) {
            maxVal = tVal;
            maxValCount = 1;
            // otherwise, increment number of maxVal tasks
        } else if (tVal === maxVal) {
            maxValCount++;
        }
    }
    // our formula, handle the edge case
    return Math.max(tasks.length, (maxVal - 1) * (n + 1) + maxValCount);
};