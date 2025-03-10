请给出git 分支 最简单的例子 切换分支的命令

假设你正在开发一个项目，并希望在一个新分支上进行一些实验性的更改，而不影响主分支（通常是 main 或 master）。

1. 初始化仓库并创建初始提交
```
# 创建一个新的目录并进入该目录
mkdir my-project
cd my-project

# 初始化 Git 仓库
git init

# 创建一个示例文件
echo "Initial content" > README.md

# 将文件添加到暂存区并提交
git add README.md
git commit -m "Initial commit"
```
2. 查看当前分支

git branch

星号 (*) 表示当前所在的分支。

3. 创建并切换到新分支
假设你想在一个新的分支上进行一些实验性的工作，可以使用以下命令创建并切换到新分支：
git checkout -b new-feature
也可以
git switch -c new-feature
这将创建一个名为 new-feature 的新分支，并自动切换到该分支。


4. 查看当前分支

git branch

星号 (*) 现在指向 new-feature 分支，表示你当前在这个分支上工作。

5. 在新分支上进行更改
```
echo "New feature content" >> README.md

# 将更改添加到暂存区并提交
git add README.md
git commit -m "Add new feature content"
```

6. 切换回主分支
```
git checkout main
git switch main
```

7. 查看文件状态
```
cat README.md
```
Initial content

8.  合并新分支的更改（可选）

git checkout main
git merge new-feature

9. 移除

git branch -d new-feature 安全
git branch -D new-feature 强制


