# 用两个栈实现队列

使用两个栈来实现一个队列，要求支持队列的 push 和 pop 操作。
  push 
  pop
- stack LIFO
- queue FIFO

stack 能满足push 
pop 受限， 借助另外一个栈来实现
- 入队时，直接入栈 stack1
- 出队时，先判断 stack2 是否为空
  - 如果为空，将 stack1 中的元素全部出栈并压入 stack2，然后从 stack2 出栈
  - 如果不为空，直接从 stack2 出栈




