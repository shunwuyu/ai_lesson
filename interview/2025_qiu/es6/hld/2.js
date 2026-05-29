function light(color, ms) {
    console.log(color);
    return new Promise(r => setTimeout(r, ms));
  }
  
  function loop() {
    light('red', 1000)
      .then(() => light('yellow', 3000))
      .then(() => light('green', 2000))
      .then(loop); // 循环
  }
  
  loop();
  