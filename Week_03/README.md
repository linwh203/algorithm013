学习笔记

1. 递归模板
   ``
   // JavaScript
   const recursion = (level, params) =>{
   // recursion terminator
   if(level > MAX_LEVEL){
   process_result
   return
   }
   // process current level
   process(level, params)
   //drill down
   recursion(level+1, params)
   //clean current level status if needed

}
``

2. 递归思维要点：
   找到最近最简方法，将其拆解成重复子问题
   使用数学归纳法思维寻找重复性

3. 分治即拆解 problem 成多个 subProblem，最后将 subSolution 合成 solution

4. 回溯的本质在于“选择”和“撤销选择”。（push & pop） 如果将回溯过程看成树的话，整个过程类似决策树。
