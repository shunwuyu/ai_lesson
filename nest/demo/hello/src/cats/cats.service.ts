import { Injectable } from '@nestjs/common';

@Injectable() // 标记这个类为服务，可以被其他组件注入
export class CatsService {
  private cats = ['Tom', 'Jerry'];

  findAll() {
    return this.cats; // 返回猫咪列表
  }

  addCat(cat: string) {
    this.cats.push(cat); // 向列表中添加猫咪
    return this.cats; // 返回新的猫咪列表
  }
}
