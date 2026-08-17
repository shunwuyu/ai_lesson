# 什么是nest.js

NestJS 是基于 Node.js 的后端框架，默认使用 TypeScript 开发，全面模块化思想，适合构建企业级服务。
适合中大型项目，生态完善，适合团队协作开发后端接口。

## 安装 

安装 nest cli

npm i -g @nestjs/cli

创建新项目

nest new hello

进入目录启动

npm run start:dev

http:localhost:3000

## 核心目录说明

`src/main.ts`：程序入口
`app.module.ts`：根模块 根组件
`app.controller.ts`：控制器  控制器就是负责接收前端发过来的请求，把活儿交给服务去干，最后再把结果返回给前端。
`app.service.ts`：业务服务 service 就是真正干活的，处理业务、操作数据，不让控制器写复杂逻辑。

## 工厂模式

工厂模式就像蜜雪冰城门店，你不用自己熬糖浆煮茶，只要点单告诉店员（工厂）要什么饮品，门店直接给你做好一杯成品对象，不用管里面怎么做出来的。

demo 

```
// 多个产品类
class IceCream {
  constructor() {
    this.name = '摩天脆脆'
    this.price = 3
  }
  show() {
    console.log(`🍦${this.name}，${this.price}元`)
  }
}

class LemonTea {
  constructor() {
    this.name = '柠檬水'
    this.price = 4
  }
  show() {
    console.log(`🍋${this.name}，${this.price}元`)
  }
}

class MilkTea {
  constructor() {
    this.name = '珍珠奶茶'
    this.price = 8
  }
  show() {
    console.log(`🧋${this.name}，${this.price}元`)
  }
}

// 蜜雪冰城工厂：负责生产各个类的实例
class MixueFactory {
  static createDrink(type) {
    switch (type) {
      case 'ice': return new IceCream()
      case 'lemon': return new LemonTea()
      case 'milk': return new MilkTea()
      default: throw new Error('暂无这款饮品')
    }
  }
}

// 使用：外部只找工厂，不直接 new 各个饮品类
const drink1 = MixueFactory.createDrink('ice')
drink1.show()

const drink2 = MixueFactory.createDrink('milk')
drink2.show()

```

## 单例模式
```
single.html
```

## 代理模式
proxy.js

## 订阅发布者模式


工厂封装复杂构建，可产出 Web、微服务等多种应用实例，屏蔽底层细节。

