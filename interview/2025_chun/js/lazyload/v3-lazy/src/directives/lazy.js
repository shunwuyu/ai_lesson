// src/directives/lazy.js
export default {
    mounted(el, binding) {
      // 创建 IntersectionObserver 实例
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // 当元素进入视口时加载图片
            const img = entry.target;
            const src = binding.value;
            
            // 设置图片 src
            img.src = src;
            
            // 添加加载动画/效果类
            img.addEventListener('load', () => {
              img.classList.add('loaded');
            });
            
            // 停止观察这个元素
            observer.unobserve(img);
          }
        });
      });
      
      // 开始观察元素
      observer.observe(el);
      
      // 保存观察者引用以便清理
      el._lazy_observer = observer;
    },
    
    beforeUnmount(el) {
      // 组件卸载前取消观察
      if (el._lazy_observer) {
        el._lazy_observer.unobserve(el);
        delete el._lazy_observer;
      }
    }
  }