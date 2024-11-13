https://www.bilibili.com/video/BV1zFypY7E6X/?spm_id_from=333.1007.tianma.4-2-12.click&vd_source=3d50341f547faf8df242a214b04f2d86

- Qwen2 本地部署及垂直法律模型
  - 4gb 内存 

- git clone https://github.com/QwenLM/Qwen.git
- 安装环境
  conda create -n qwen2 python==3.10.14 创建一个新的虚拟环境
  -n qwen2 名字 激活删除环境
  conda activate qwen2 激活环境
  pip install -r requirements.txt 安装依赖
  cat requirements.txt 可以看到所有依赖

  安装pytorch https://download.pytorch.org/whl/torch_stable.html

- 下载1.8b模型
  git clone https://www.modelscope.cn/qwen/Qwen-1_8B-Chat.git

- 