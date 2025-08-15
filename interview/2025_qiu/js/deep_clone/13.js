let arr1 = [
    { name: "张三", hobbies: ["篮球"] },
    { name: "李四" }
  ];
  
  // 使用 slice 浅拷贝
  let arr2 = arr1.slice();
  
  // 使用 concat 浅拷贝
  let arr3 = arr1.concat();
  
  // 修改副本中的对象
  arr2[0].name = "张三（改）";
  arr2[0].hobbies.push("音乐");
  
  arr3[1].name = "李四（concat改）";
  
  // 看看原数组被影响了吗？
  console.log(arr1[0].name);     // 张三（改） ❌ 被 arr2 改了！
  console.log(arr1[0].hobbies);  // ["篮球", "音乐"] ❌ 也被改了！
  console.log(arr1[1].name);     // 李四（concat改） ❌ 被 arr3 改了！