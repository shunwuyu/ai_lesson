[source](https://ninghao.net/package/git)

- 说出你了解的git 命令？
- git help 
    常用的命令和简短的解释
    - git help -a 所有的命令
    - git help add  具体命令
        F 健向下  B健向上
    
- 配置 我们是谁 
    git config --global user.name '' 我们是谁？
    git config --global user.email '' 
    git config --list
    git config --unset --global user.name 重设
    git config --list 去除了user.name
     git config --global user.name '' 重设
    git config --global color.ui true 输出带颜色



- git init 
   mkdir movietalk
    git init 
    cd .git  仓库   打开  ls 
    通过情况下，我们不会动这个目录里面的东西，
    如果你不想再让 Git 跟踪 movietalk 这个项目了.. 直接就可以把这个目录下面的 .git 目录删除掉就行了。
    删除再做
    存的是文件的版本

- 忽略文件
    .gitignore  node_modules/  *.log 
    添加 access.log  
    git status clean  已经成功

- git commit
    git status  on branch master Initial commit  nothing to commit
    index.html 基本html结构
    git status  unchecked files    未跟踪的文件
    git add index.html  添加具体的文件   货车  把文件添加到暂存区
    git status changes to be commited 红变绿
    git commit -m '添加 index.html文件'   提交到仓库
    git status working directory clean 
    git log 

- git diff
    lang="zh-hans" 修改index.html 
    git status  
    git diff index.html 提交前修改  repo  和工作目录的 区别
    git add index.html
    git status  暂存区
    git diff 暂存区 和工作目录比较  没有差异
    <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1.0,maximum-scale=1.0,mnimum-scale=1.0"> 移动优化
    git status 暂存区有些修改 两次修改
    git diff index.html 
    git diff index.html --staged  暂存区的修改 repo 暂存区
    git commit -m '修改了index.html的lang属性值为zh-hans'
    git add index.html
    git commit -m '修改了index.html viewport meta 标签'
    git log 三个提交的信息

- 重命名文件
    style.css 新建
    h1{
        font-size:30px;
    }
    git status 未跟踪的文件
    git add .
    git commit -m '添加style.css 文件'
    右键重命名 style.css
    git status  删除了， 还有一个未跟踪
    git rm style.css
    git add theme.css
    git status  renamed style.css -> theme.css
    git commit -m '将style.css 重命名为theme.css'

- 重命名二
    git mv theme.css ninghao-theme.css
    git status renamed theme.css->ninghao-theme.css
    git commit -m '把theme.css 重命名为 ninghao-theme.css'

- 移动
    mkdir css 
    git status  clean  git 不会跟踪空目录
    git mv ninghao-theme.css css/  
    git status  renamed ninghao-theme.css -> css/theme.css
    git commit -m '把ninghao-theme.css 移动到css目录下'
    目录移动 
    mkdir asset
    git mv css asset/
    git status  renamed css/theme.css -> asset/css/theme.css
    git commit -m '把css目录移动到asset目录下'

- 删除
    git rm .\asset\css\ninghao-theme.css
    git status  deleted  asset/css/ninghao-theme.css
    git commit -m '删除了ninghao-theme文件'

- 删除文件恢复过来
    git rm index.html
    git status
    不想删除 未提交
    git checkout HEAD -- index.html   将index.html 恢复过来  最近一次的提交

    不想删除 已提交
    git rm index.html
    git status delete index.html  不想删除 
    git checkout HEAD -- index.html  checkout 有很多功能   最近一次提交
    ls  看index.html又回来了
    git status 干净了
    git rm index.html
    git commit -m '删除了index.html文件' 提交了 
    git checkout HEAD^ -- index.html  上上次提交  
    git commit -m '恢复了index.html'

- 恢复文件历史版本
    创建一个css 目录 将 bootstrap.css 加入css目录
    css/bootstrap.css
    index.html  link 引入 bootstrap.css <link href="./css/boostrap.css">
    git status  
    git  add .
    git commit -m '添加了bootstrap 框架'
    js/jquery.js 创建js 目录  
    index.html script 引入
    git status
    git  add .
    git commit -m '添加了jquery框架'
    git log --oneline
    git revert 9d0f0b8 不想用bootstrap bootstrap 那个提交 之前的样子 revert 指定的那次
    如果你只是想简单地撤销一些更改而不影响历史记录，git revert 是一个好选择。如果你需要调整提交历史或者清理工作目录，那么 git reset 更合适。

默认情况下，每一次提交以后，头部指针都会指向最后这次提交， git reset 我们可以控制这个指针的位置，比如我们让它指向之前的某次提交，这样，下面再提交的时候，会覆盖掉之后的所有的提交。 
    --soft ，软重置，使用这个选项重置提交，不会影响到工作目录还有暂存区里的东西。
    另外还有一个 --hard 选项，它会把工作目录还有暂存区，直接重置到指定的提交状态
    默认是 --mixed ... 使用这个选项会把暂存区里的东西重置到指定提交 的状态，并且会把指针指向这个提交

- 重置提交 - 控制头部指针 - git reset  soft 
    git log --oneline
    新建一个临时文件 添加了Bootstrap 到 最后的三个提交 放到临时文件， 无题
    git reset --soft 1566dba   仅移动 HEAD，不改变暂存区和工作目录。添加了jquery的id   
    git status  delete css/bootstrap.min.css  modify index.html 在暂存区里了。 
        不会影响到工作目录还有暂存区里的东西 

    git reset --mixed 1566dba 移动 HEAD 和清空暂存区，保留工作目录中的更改。 未入暂存区 
    git status  暂存区不在了    
    git reset --hard 1566dba  移动 HEAD、清空暂存区，并丢弃工作目录中的更改。
    git status  干净 它会把工作目录还有暂存区，直接重置到指定的提交状态
    git reset --hard 最后那个revert的id  css 目录不在了 index.html 链接也不在了 

- stash 暂存修改 保存到一个地方
    humans.txt   #humanstxt.org/ 添加了点内容
    git status   你想修改其他东西， 但不想跟这个humans.txt 修改一并提交， 可以用stash 保存了进度
    git stash save 'humans.txt' 保存进度 会恢复到之前的状态
    git status 
    git stash list 查看 保存进度列表
    git stash show -p stash@{0} 现实区别
    git stash apply  stash@{0} 恢复
    git stash drop stash@{0} 删除
    git stash list 就没有了
    可以再试试
    git stash pop stash@{0} 恢复并删除 

- 查看日志
    git log --oneline 简单现实列表
    git log --oneline -5 限制5条
    git log --oneline --author="王皓"  指定作者
    git log --oneline --grep="index.html" 所有包含index.html 的提交
    git log --oneline --graph 
    git help lop    查看帮助


- .gitignore
    *.log
    node_modules
    git add .
    git commit -m '添加了gitignore文件'
    access.log
    新增example.txt 取消记录ignore
    git add git commit -m 'add example.txt'
    git rm --cached example.txt
    .gitignore  example.txt
    

- 别名
    git config --global alias.co checkout
    git branch 
        master
        mobile-feature
    git co master
