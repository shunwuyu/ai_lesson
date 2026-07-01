// test/math.test.js

const { expect } = require('chai'); // 引入Chai的expect函数
const { add } = require('../src/math'); // 引入add函数

// describe: 用于对测试用例进行分组（测试套件）
describe('Math add 函数测试', () => {
  
  // it: 描述一个具体的测试用例
  it('应该正确返回两个正数相加的结果', () => {
    expect(add(2, 3)).to.equal(5);
  });

  it('应该正确处理负数相加', () => {
    expect(add(-1, -2)).to.equal(-3);
  });

  it('应该正确处理与 0 相加', () => {
    expect(add(5, 0)).to.equal(5);
  });

  it('当传入 undefined 时，应该抛出 TypeError', () => {
    expect(() => add(5)).to.throw(TypeError);
  });

  it('当传入对象时，应该抛出 TypeError', () => {
    expect(() => add({}, 3)).to.throw(TypeError);
  });
  
});