<button id="toggleBtn">关</button>


const btn = document.getElementById("toggleBtn");
let isOn = false;

btn.addEventListener("click", function () {
  isOn = !isOn; // 切换状态

  // 👇 一步步操作 DOM：你要改文字、改颜色、手动更新...
  if (isOn) {
    btn.textContent = "开";
    btn.style.backgroundColor = "green";
    btn.style.color = "white";
  } else {
    btn.textContent = "关";
    btn.style.backgroundColor = "gray";
    btn.style.color = "black";
  }
});