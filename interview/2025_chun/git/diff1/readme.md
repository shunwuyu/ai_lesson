- Git 什么场景下会产生冲突?如何解决?
  分布式
  - 多人协作开发：多个开发者同时修改同一个文件的同一部分。
  - 分支合并：从一个分支合并到另一个分支时（如 git merge 或 git rebase），如果两个分支对同一文件的同一部分进行了不同的修改。
  - 拉取远程更改：当你从远程仓库拉取最新更改并尝试将其与本地更改合并时。

  例子
  - 初始状态
  ```
  // example.txt
  Hello, World!
  ```
  - 你 在本地修改了文件
  ```
  Hello, World!
  Welcome to the future!
  ```
  - 同事 在远程仓库中也修改了文件，但添加了不同的内容：
  ```
  Hello, World!
Welcome to the past!
  ```

  - 提交并推送
  你提交并推送了你的更改到远程仓库。
  同事也在他们本地提交了他们的更改，并试图推送到远程仓库。

  Git 会阻止同事直接推送他们的更改，因为他们的本地版本与远程版本不同。同事需要先拉取最新的更改并解决冲突。

### 解决冲突的步骤
  1. 拉取最新更改
  git pull origin main
  2. 查看冲突文件
  git diff example.txt
  ```
  Hello, World!
<<<<<<< HEAD
Welcome to the past!
=======
Welcome to the future!
>>>>>>> branch-name
  ```
  <<<<<<< HEAD 和 ======= 之间的内容是当前分支（HEAD）中的修改。
======= 和 >>>>>>> branch-name 之间的内容是从其他分支合并进来的修改。
  3. 手动解决冲突
  你需要手动编辑文件来解决冲突。例如，你可以选择保留其中一个版本或合并两者：
  ```
  Hello, World!
  Welcome to the past and the future!
  ```
  4. 标记冲突已解决
  ```
  git add example.txt
  ```

  5. 完成合并
  ```
  git commit -m "Resolved merge conflict in example.txt"
  ```

  6. 推送更改

  ```
  git push origin main
  ```