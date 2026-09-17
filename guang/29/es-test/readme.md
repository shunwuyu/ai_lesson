https://bailian.console.aliyun.com/cn-beijing/model/market  qwen3-rerank 

curl --location 'https://dashscope.aliyuncs.com/api/v1/services/rerank/text-rerank/text-rerank' \
--header "Authorization: Bearer sk-ws-H.PHHELRY.VNr6.MEQCIDVoKtbVvqz7x4YbDYKQvJiOVxk3ovfKgDel2nEfdwFnAiA15jX4zp__zSsqg-Te_pM667iAOlLvAoncqBFVYcxbjA" \
--header 'Content-Type: application/json' \
--data '{
    "model": "qwen3-rerank",
    "input": {
        "query": "什么是文本排序模型",
        "documents": [
            "文本排序模型广泛用于搜索引擎和推荐系统中，它们根据文本相关性对候选文本进行排序",
            "量子计算是计算科学的一个前沿领域",
            "预训练语言模型的发展给文本排序模型带来了新的进展"
        ]
    },
    "parameters": {
        "return_documents": true,
        "top_n": 5
    }
}'