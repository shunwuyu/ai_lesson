# k8s 容器管理系统

Kubernetes = k8s = ubernete 8个字缩写
Kubernetes 是一个用来自动部署、管理、扩容和恢复容器的系统。


Docker 只管把应用打包成容器，跑单个 / 少数容器够用。
但大规模时，成千上百容器，要扩缩容、故障自愈、调度机器、负载均衡，docker 做不到。
K8s 就是管一大堆容器的调度管家，负责批量部署、监控、自动修复，适合集群大规模业务。

Docker 是餐盒，打包程序，随处运行。
开饭店大量餐盒，餐盒管不过来。
K8s 就是大堂经理，调度、容错、扩缩容，管好一堆容器。

```
如果我们有一个 Node.js 服务，直接 node app.js 就可以运行，为什么还需要 Kubernetes？
```

但是生产环境可能出现：

问题 1：程序挂了
Node.js
   ↓
崩溃
   ↓
没人处理
   ↓
网站挂了

2. 流量突然变大
原来·
100 个用户
    ↓
1 个 Node.js
现在·
10 万用户
    ↓
1 个 Node.js
    ↓
顶不住

怎么办？
需要 Kubernetes 来自动扩容，负载均衡。

问题 3：到底运行在哪里？
比如我们有 3 台服务器：
服务器 A
服务器 B
服务器 C

问题 4：某台机器挂了

服务器 A 💥

Node.js 💥

服务器 B 

Node.js

## 容器管理系统

Docker 更关注 
怎么把应用
打包成容器

Kubernetes 更关注：

这些容器
怎么管理

## Pod 容器荚

Container 
真正运行你的程序： 

Kubernetes 不直接管理 Container，而是通过 Pod 管理。

Pod 是 Kubernetes 中运行容器的最小单位。

Pod
└── Container
    └── Node.js

## Deployment

如果我要运行 3 个 Pod：
Pod
Pod
Pod

Deployment 负责管理 Pod 的数量和版本。

Deployment
     │
     ├── Pod
     ├── Pod
     └── Pod

## Service
但是 Pod 有一个问题：
Pod IP
可能会变化。
例如：
Pod A
10.0.0.1

挂了。

K8s 创建：
Pod B
10.0.0.8

如果前端直接访问：

10.0.0.1

就废了。
所以需要：

Service 提供一个稳定的访问入口。

最终

用户
 ↓
Service
 ↓
Pod
 ↓
Container

## 画出整个 Kubernetes 架构

Pod

我要运行一个应用。

Deployment

我要运行几个 Pod，并且保证它们一直存在。

Service

我要给这些 Pod 一个稳定的访问入口。

## 启动Kubernetes集群

设置 Kubernetes 集群 Enable 

docker build -t k8s-demo:v1 .

docker images

docker run -p 3000:3000 k8s-demo:v1

第三步：让 Kubernetes 运行 Pod

k8s/pod.yaml


kubectl apply -f k8s/pod.yaml

kubectl port-forward pod/k8s-demo 3000:3000

kubectl get pods

kubectl delete pod k8s-demo

Docker Container 是容器，而 Pod 是 Kubernetes 用来承载容器的对象。