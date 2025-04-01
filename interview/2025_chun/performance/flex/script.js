/**
 * 自定义性能指标函数
 */
function measureRenderTime() {
    const startTime = performance.now(); // 记录开始时间

    // 监听第一个元素的渲染完成
    const firstElement = document.querySelector('.flex-item'); // 获取第一个元素
    
    // 确保firstElement不为空
    if (!firstElement) {
        console.error('未能找到具有.flex-item类的第一个元素');
        return;
    }

    // 使用一个简单的轮询机制来检查第一个元素是否已经渲染
    const checkFirstRendered = setInterval(() => {
        if (firstElement.offsetHeight > 0 && firstElement.offsetWidth > 0) { // 检查元素尺寸
            clearInterval(checkFirstRendered); // 停止检查
            const firstRenderTime = performance.now() - startTime; // 计算第一个元素渲染时间
            console.log(`第一个元素渲染完成时间: ${firstRenderTime.toFixed(2)} ms`);
        }
    }, 50); // 每50毫秒检查一次

    // 监听所有元素的渲染完成
    const allElements = document.querySelectorAll('.flex-item'); // 获取所有元素
    const checkAllRendered = setInterval(() => {
        const allRendered = Array.from(allElements).every(el => el.offsetHeight > 0 && el.offsetWidth > 0); // 检查所有元素是否渲染完成
        if (allRendered) {
            clearInterval(checkAllRendered); // 停止检查
            const totalRenderTime = performance.now() - startTime; // 计算总渲染时间
            console.log(`所有元素渲染完成总时间: ${totalRenderTime.toFixed(2)} ms`);
        }
    }, 50); // 每50毫秒检查一次
}

// 调用函数
measureRenderTime();