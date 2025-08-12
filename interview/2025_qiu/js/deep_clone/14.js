let arr1 = [
    { name: "张三", hobbies: ["篮球"] }
  ];
  
  // 利用 JSON 实现简单深拷贝（注意有局限）
  let arr2 = JSON.parse(JSON.stringify(arr1));
  
  // 修改副本
  arr2[0].name = "张三（深拷贝改）";
  arr2[0].hobbies.push("游泳");
  
  console.log(arr1[0].name);     // 张三 ✅ 没被影响
  console.log(arr1[0].hobbies);  // ["篮球"] ✅ 没被影响