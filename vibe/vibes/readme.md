## 如何使用
- 新建一个vibes 文件夹
- 选择cursor 
- 一句话介绍下 vercel
  Vercel 是一个支持快速部署前端应用和静态网站的云平台，简单高效。

- 为我写一个终端命令来初始化一个新的Vercel应用。
  npm config set registry https://registry.npmjs.org/
  npm install -g vercel
  vercel init
  next.js
- https://www.peachpup.com/
 女朋友卖一些小别针....
 换一个风格
 左滑，右滑 喜欢的添加到购物车
- npm i 
- npm run dev
- 将page.tsx 改成hello
  <div style={{ backgroundColor: '#ffe7e5' }} className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div style={{backgroundColor:'green'}}>
        hello world
      </div>
    </div>
- 让这个div 像tinder
  得到代码，
  改下背景和边框
  background-color: #f8faf8;
  border: 1px solid rgb(170 162 162);
- 将图片放入public 
  I have a list of images in public/assets, one of the images is Corgi_Bundle_720x.webp. please render this image in the div.

- 修正图片
crop the image reducing all borders by 5px.
Add a border radius matching the outer
radius, make the color something in theme
make the image slightly larger
 
- 左右滑动
I have a lot of pictures in public/assets. I
want you to load them all in, and then create
a tinder like swipe left/right
experience to swipe through all of the
images.