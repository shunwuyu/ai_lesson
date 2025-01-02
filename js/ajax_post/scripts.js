document.getElementById('userForm').addEventListener('submit', function(event) {
  event.preventDefault(); // 阻止表单默认提交行为

  const username = document.getElementById('username').value;
  const hometown = document.getElementById('hometown').value;

  const xhr = new XMLHttpRequest();
  // 请求是否为异步的
  xhr.open("POST", "http://localhost:3004/users", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 201) {
          document.getElementById('responseMessage').textContent = '用户已成功添加！';
          // 清空表单
          document.getElementById('userForm').reset();
      }
  };

  xhr.send(JSON.stringify({ username: username, hometown: hometown }));
});