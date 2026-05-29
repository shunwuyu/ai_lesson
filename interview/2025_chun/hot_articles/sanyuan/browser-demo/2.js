function lazyload() {
    for(let i = count; i <num; i++) {
      // 元素现在已经出现在视口中
      if(img[i].getBoundingClientRect().top < document.documentElement.clientHeight) {
        if(img[i].getAttribute("src") !== "default.jpg") continue;
        img[i].src = img[i].getAttribute("data-src");
        count ++;
      }
    }
  }
  