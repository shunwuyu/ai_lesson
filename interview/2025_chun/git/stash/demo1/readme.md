假设你在开发一个新功能，但发现了一个紧急的 bug 需要修复。

## 使用 git stash

git stash 是一个非常有用的命令，它允许你暂时保存当前工作区的更改，而不必提交它们。这样你可以切换到其他分支来修复 bug。

- 保存当前工作：
  git stash save "WIP: Current work in progress"

- 查看 stash 列表
  git stash list

- 切换到需要修复 bug 的分支：
  git checkout main

- 修复 bug 并提交更改：
  # 进行必要的修改
echo "Fix for the bug" >> bugfix.txt
git add bugfix.txt
git commit -m "Fix critical bug"

- 切换回原来的分支：
  git checkout your-feature-branch

- 恢复暂存的工作
  git stash pop

 如果你不想删除 stash 记录，可以使用 git stash apply 来应用更改而不删除记录。

 git log --oneline