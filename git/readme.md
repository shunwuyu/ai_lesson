[source](https://ninghao.net/package/git)
- 说出你了解的git 命令
- git help 
    命令和解释
    - git help -a 所有的命令
    - git help add  具体命令
        F 健向下  B健向上
    
- 配置
    git config --unset --global user.name 去除
    git config --global user.name '' 我们是谁？
    git config --global user.email '' 
    git config --list
    git config --global color.ui true 输出带颜色

- git init 
   mkdir movietalk
    git init 
    cd .git  仓库   打开  ls 
    通过情况下，我们不会动这个目录里面的东西，
    如果你不想再让 Git 跟踪 movietalk 这个项目了.. 直接就可以把这个目录下面的 .git 目录删除掉就行了。
    删除再做
    存的是文件的版本

- git commit
    git status 
    index.html 基本html结构
    git status  unchecked files    未跟踪的文件
    git add index.html  添加具体的文件   货车  把文件添加到暂存区
    git status changes to be commited 
    git commit -m '添加 index.html文件'   提交到仓库
    git status working directory clean 
    git log 

- git diff
    lang="zh-hans"
    git status  
    git diff index.html 提交前修改
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
    git commit -m '删除了index.html文件'
    git checkout HEAD^ -- index.html  上上次提交

- 恢复文件历史版本
    css/bootstrap.css
    index.html  link 引入
    git  add .
    git commit -m '添加了bootstrap 框架'
    js/jquery.js
    index.html script 引入
    git  add .
    git commit -m '添加了jquery框架'
    git log --oneline
    git revert 9d0f0b8

    如果你只是想简单地撤销一些更改而不影响历史记录，git revert 是一个好选择。如果你需要调整提交历史或者清理工作目录，那么 git reset 更合适。

- 重置提交 - 控制头部指针 - git reset
    git log --oneline
    git reset --soft 1566dba   仅移动 HEAD，不改变暂存区和工作目录。
    git status  
    git reset --mixed 1566dba 移动 HEAD 和清空暂存区，保留工作目录中的更改。
    git status 
    git reset --hard 1566dba  移动 HEAD、清空暂存区，并丢弃工作目录中的更改。

- stash 暂存修改
    humans.txt   humans
    git add .
    git stash save 'humans.txt'
    git status 
    git stash list
    git stash apply  stash@{0}


    


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
