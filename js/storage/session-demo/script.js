document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const clearStorageBtn = document.getElementById('clearStorage');

    // 读取 sessionStorage 中的数据并填充表单
    if (sessionStorage.getItem('username')) {
        document.getElementById('username').value = sessionStorage.getItem('username');
    }
    if (sessionStorage.getItem('email')) {
        document.getElementById('email').value = sessionStorage.getItem('email');
    }

    // 提交表单时保存数据到 sessionStorage
    userForm.addEventListener('submit', (e) => {
        e.preventDefault(); // 防止表单提交
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;

        // 存储数据到 sessionStorage
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('email', email);

        alert('Data saved to sessionStorage!');
    });

    // 清除 sessionStorage
    clearStorageBtn.addEventListener('click', () => {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('email');
        document.getElementById('username').value = '';
        document.getElementById('email').value = '';
        alert('Session storage cleared!');
    });
});