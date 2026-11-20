# 注册与接入：从申请到第一次调用

## 腾讯云使用 Jev 模型
https://cloud.tencent.com/document/product/1552/138731
Jev 是 TypeSafe AI 的旗舰模型，也是其第一个 System One 模型：它不生成文本，而是针对一段 state（待判断的内容）并行求值一组强类型问题（questions），直接返回可被代码消费的结构化结果（选项、分档、概率、置信度）。通过 EdgeOne Makers 内置模型统一接入后，您可以直接调用 @makers/jev，无需自行申请和管理 TypeSafe 账号与密钥。

curl -i -X POST "https://ai-gateway.edgeone.link/v1/systemone" \
  -H "Authorization: Bearer sk-Va31A7tIeZ7j2WNYTisVxtYBe89IqZoFiaZcD2Cqk5BAdZMavruSashZR4Q" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "@makers/jev",
    "state": "Hi, I have been trying to connect my Stripe account for 3 days and the integration keeps failing. I am losing sales. Please help ASAP.",
    "questions": {
      "department": {
        "type": "choice",
        "instructions": "Which team should handle this",
        "criteria": {
          "billing": "Payment or subscription issues",
          "technical": "Bugs or integration problems",
          "sales": "Pricing or account questions"
        }
      },
      "frustration": {
        "type": "score",
        "instructions": "How frustrated the customer appears",
        "criteria": [
          "Calm, just stating facts",
          "Frustrated but civil",
          "Very angry, strong language"
        ]
      },
      "is_urgent": {
        "type": "noul",
        "instructions": "The message conveys urgency or time-sensitivity"
      }
    }
  }'

- go mod init edgeone-systemone-demo
- go get github.com/joho/godotenv
- 