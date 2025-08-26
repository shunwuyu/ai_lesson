// 泛型节点：可以存储任何类型的值 T
// 而泛型 保留了类型信息，实现了 类型安全的复用。
class Node<T> {
    value: T;
    next: Node<T> | null = null;
  
    constructor(value: T) {
      this.value = value;
    }
  }
  
  // 泛型链表：操作 T 类型的节点
  class LinkedList<T> {
    head: Node<T> | null = null;
  
    // 插入到链表尾部
    append(value: T): void {
      const newNode = new Node(value);
      if (!this.head) {
        this.head = newNode;
        return;
      }
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  
    // 遍历并打印所有值
    print(): void {
      const values: T[] = [];
      let current = this.head;
      while (current) {
        values.push(current.value);
        current = current.next;
      }
      console.log(values);
    }
  }

// 创建一个存储数字的链表
const numberList = new LinkedList<number>();

numberList.append(1);
numberList.append(2);
numberList.append(3);

numberList.print(); // 输出: [1, 2, 3]

// 定义一个用户类型
interface User {
    id: number;
    name: string;
  }
  
  // 创建一个存储 User 对象的链表
  const userList = new LinkedList<User>();
  
  userList.append({ id: 1, name: "Alice" });
  userList.append({ id: 2, name: "Bob" });
  userList.append({ id: 3, name: "Charlie" });
  
  userList.print();
  // 输出:
  // [
  //   { id: 1, name: 'Alice' },
  //   { id: 2, name: 'Bob' },
  //   { id: 3, name: 'Charlie' }
  // ]