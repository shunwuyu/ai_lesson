package main

import (
	"context"
	"fmt"
	"os"

	"github.com/cloudwego/eino-ext/components/model/openai"
	"github.com/cloudwego/eino/schema"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()
	apiKey := os.Getenv("ARK_API_KEY")
	apiModel := os.Getenv("ARK_MODEL")
	apiBaseURL := os.Getenv("ARK_BASE_URL")
	// println(apiKey)
	ctx := context.Background()

	// // 1. 创建模型（记得提前设置 OPENAI_API_KEY）
	model, _ := openai.NewChatModel(ctx, &openai.ChatModelConfig{
		Model:   apiModel,
		BaseURL: apiBaseURL,
		APIKey:  apiKey,
	})

	// // 2. 调用
	resp, _ := model.Generate(ctx, []*schema.Message{
		{
			Role:    schema.User,
			Content: "你好，介绍一下你自己",
		},
	})

	// // 3. 输出
	fmt.Println(resp.Content)
}
