OPENAI 应用接口的关键概念
Prompt Completion Token Model
- post https://api.openai.com/v1/completions  401 Unauthorized
- auth Bear Token  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
    400 Bad Request  invalid_request_error
- body json
    {
    "model":"text-davinci-003",
    "prompt":"写一首描述春天的诗歌",
    "temperature":0.7,
    "max_tokens":256
    }