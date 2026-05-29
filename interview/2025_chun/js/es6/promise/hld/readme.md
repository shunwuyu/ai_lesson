class TrafficLight {
    constructor() {
        this.state = 'red'; // 初始状态为红灯
    }

    // 模拟红灯
    red() {
        return new Promise((resolve) => {
            console.log('红灯亮，停止！');
            setTimeout(() => {
                this.state = 'green'; // 1秒后切换到绿灯
                resolve(this.state);
            }, 1000); // 红灯持续1秒
        });
    }

    // 模拟绿灯
    green() {
        return new Promise((resolve) => {
            console.log('绿灯亮，行驶！');
            setTimeout(() => {
                this.state = 'yellow'; // 1秒后切换到黄灯
                resolve(this.state);
            }, 1000); // 绿灯持续1秒
        });
    }

    // 模拟黄灯
    yellow() {
        return new Promise((resolve) => {
            console.log('黄灯亮，准备停车！');
            setTimeout(() => {
                this.state = 'red'; // 1秒后切换回红灯
                resolve(this.state);
            }, 1000); // 黄灯持续1秒
        });
    }

    // 启动红绿灯循环
    start() {
        this.red()
            .then(() => this.green())
            .then(() => this.yellow())
            .then(() => this.start()); // 循环调用
    }
}

// 使用示例
const trafficLight = new TrafficLight();
trafficLight.start(); // 启动红绿灯