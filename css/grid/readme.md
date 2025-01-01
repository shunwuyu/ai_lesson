- git checkout -b css-grid-starter
- div.container>div.item.item__${1}*9
- 添加完main.css后
  git add .
  git commit -m '准备学习css grid'
  git push origin css-grid-starter

- 新建一个分支
  git checkout -b css-grid
  git push origin css-grid

- grid css
  .container {
  display: grid;
  grid-template-columns: 200px 200px 200px;
  /* grid-template-rows: 200px 200px 200px; */
  grid-auto-rows: 200px;/*自动生成的行的高度。*/
}

- fr
    grid-template-columns:1fr 5fr 1fr;
    算一下

    高度
    height: 100vh

    grid-auto-rows: 1fr;

- 间隔
  column-gap:4px;
  row-gap:4px;

- repeat

  .container {
  display: grid;
  grid-template-columns:1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-columns:repeat(9, 1fr);
  grid-template-columns:repeat(2, 1fr 2fr);
  grid-template-columns: 80px repeat(2, 1fr);
  height: 100vh;
  grid-auto-rows: 1fr;
  column-gap: 4px;
  row-gap: 4px;
} 

- 网格线


- git checkout -b css-transition
  index.html
  styles/style.css 准备一下



