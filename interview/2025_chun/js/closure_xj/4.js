function addHandler() {
    let element = document.getElementById('button');
    element.addEventListener('click', () => {
        // 这里持有 element 的引用
        console.log(element.id);
    });
}

function addHandler() {
    let element = document.getElementById('button');
    const handler = () => {
        console.log(element.id);
        // 清理
        element.removeEventListener('click', handler);
        element = null;
    };
    element.addEventListener('click', handler);
}