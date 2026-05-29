const getDialog = (function() {
    let instance = null; // 闭包中保存单例
  
    function createDialog() {
      const div = document.createElement('div');
      div.innerText = '这是一个弹窗';
      div.style.cssText = `
        position: fixed;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        border: 1px solid #ccc;
        padding: 20px 40px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        z-index: 9999;
      `;
      document.body.appendChild(div);
      return div;
    }
  
    return function() {
      if (!instance) {
        instance = createDialog();
      }
      return instance;
    };
})();
  
  // 使用示例：每次调用都只会创建一个弹窗
document.getElementById('showBtn').onclick = function() {
getDialog().style.display = 'block';
};