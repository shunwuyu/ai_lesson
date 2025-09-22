interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

// “Pick 就是从一个类型里挑你需要的字段，形成新的类型。”
// 只取 id 和 name
type UserPreview = Pick<User, 'id' | 'name'>;

const u: UserPreview = {
  id: 1,
  name: 'Alice',
  // age: 18, // ❌ 报错，age 不在 Pick 范围内
};


// Omit —— 去掉部分字段

// “Omit 正好和 Pick 相反，它把不需要的字段排除掉，剩下的组成新类型。”

type UserSafe = Omit<User, 'email'>;

const safeUser: UserSafe = {
  id: 2,
  name: 'Bob',
  age: 30,
  // email: 'bob@example.com' // ❌ 报错
};