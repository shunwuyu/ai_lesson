// 工厂类
class ShapeFactory {
  static createShape(type, options) {
    switch (type) {
      case 'circle':
        return new Circle(options.radius);
      case 'rectangle':
        return new Rectangle(options.width, options.height);
      default:
        throw new Error('Unknown shape type');
    }
  }
}

// 具体产品类
class Circle {
  constructor(radius) {
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius * this.radius;
  }
}

class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }
}

// 使用工厂类创建对象
const circle = ShapeFactory.createShape('circle', { radius: 5 });
const rectangle = ShapeFactory.createShape('rectangle', { width: 4, height: 6 });

console.log(circle.area()); // 78.53981633974483
console.log(rectangle.area()); // 24
