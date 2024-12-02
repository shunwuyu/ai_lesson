(function() {
    const div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.top = '10px';
    div.style.left = '10px';
    div.style.backgroundColor = 'yellow';
    div.style.padding = '10px';
    div.style.border = '1px solid black';
    div.textContent = 'Hello, World!';
    document.body.appendChild(div);
  })();