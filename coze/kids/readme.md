[source](https://time.geekbang.org/column/article/875905)

- 新建AI应用
  - KidsCareer
  童趣职业照

- 业务逻辑
  创建一个工作流 KidsCareer
  照片合成

  - 开始节点
    career string 
    photo image 
    gender string 
    style  string 默认 卡通

  - if 节点
    = gender 女孩 
    = gender 男孩
    否则 

  - 三个文本处理分支
    照片上应该是一个女孩子，请描述孩子的详细外貌特征，包括相貌、表情、神态、动作、衣着，但不要指出性别
    照片上应该是一个男孩子，请描述孩子的详细外貌特征，包括相貌、表情、神态、动作、衣着，但不要指出性别
    照片上应该是一个孩子，请描述孩子的详细外貌特征，包括性别、相貌、表情、神态、动作、衣着

  - 变量聚合
    group

  - imgUnderstand 官方插件
    输入  text  group
          url 开始 photo
  
  - 大模型
    输入
    input ImgUnderstand response_for_model
    gender 开始 gender
    career 开始 career
    style  开始 style

    系统提示词
    结合输入的孩子信息和职业信息，生成一段符合该职业形象的孩子照片提示词，要求保留孩子的形象特征，稍微增加一些年龄感，适当结合孩子的表情和符合该职业的着装、神态、动作和道具。应适当考虑在画面中添加突出职业特征的道具，比如教师类的教具、医生、运动员的道具，知识类工作者的眼镜等等，以强化职业辨识度。画面整体的场所应该是该职业的工作场所，参考用户描述的衣着，但要替换成该职业的正装衣着。-孩子性别: {{gender}}-孩子职业：{{career}}-照片风格：{{style}}# 输出内容输出描述该人物形象和场景的midjourney中文提示词，不要其他内容。

    输出
    output string 

  - 图像生成节点
    模型 选择 通用
    参考图 形象一致 开始图片节点 
    
    输入 
    input  大模型节点
    pic 开始图片
    提示词
    {{input}}}

    保留外貌的突出特征

  - 新增数据
    数据表 创建数据表
      url 图片url
      career 职业 
    - 选择并设置字段
      url 图像生成
      career 开始career

  - 查询数据
    MyPhotos 

  - 结束
    output 图像生成节点


- 最后 加
  工作流整合
  开始-photo  不等于 Empty 
  否者查询
  结束