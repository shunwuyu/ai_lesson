package main

import (
	// 字节切片 `[]byte` qing、
	// HTTP body 底层本身就是字节流
	"bytes"
	// JSON 编码器
	"encoding/json"
	// 格式化输出
	"fmt"
	// 输入输出
	"io"
	// HTTP 请求
	"net/http"
	// 环境变量
	"os"
	// 时间
	"time"
	// 加载环境变量
	"github.com/joho/godotenv"
)

// Req 请求结构体
type Req struct {
	Model string `json:"model"`
	State string `json:"state"`
	// `map`：键值对集合，类似 JS 对象
	// `string`：键的类型，固定是字符串
	// `QuestionDef`：值的类型，就是你定义的那个问题结构体
	Questions map[string]QuestionDef `json:"questions"`
}

type QuestionDef struct {
	Type         string `json:"type"`
	Instructions string `json:"instructions"`
	// 可以存放任意类型的值
	Criteria interface{} `json:"criteria"`
}

func main() {
	// 加载 .env
	err := godotenv.Load()
	if err != nil {
		fmt.Printf("加载 .env 文件失败: %v\n", err)
		return
	}

	token := os.Getenv("EDGEONE_TOKEN")
	apiURL := os.Getenv("EDGEONE_API_URL")
	if token == "" || apiURL == "" {
		fmt.Println("请在 .env 配置 EDGEONE_TOKEN 和 EDGEONE_API_URL")
		return
	}

	// 构造请求体
	reqBody := Req{
		Model: "@makers/jev",
		// 整合失败
		State: "Hi, I have been trying to connect my Stripe account for 3 days and the integration keeps failing. I am losing sales. Please help ASAP.",
		Questions: map[string]QuestionDef{
			"department": {
				Type:         "choice",
				Instructions: "Which team should handle this",
				Criteria: map[string]string{
					"billing":   "Payment or subscription issues",
					"technical": "Bugs or integration problems",
					"sales":     "Pricing or account questions",
				},
			},
			// 沮丧
			"frustration": {
				Type:         "score",
				Instructions: "How frustrated the customer appears",
				Criteria: []string{
					"Calm, just stating facts",
					// 心里不满，但言语克制
					"Frustrated but civil",
					"Very angry, strong language",
				},
			},
			"is_urgent": {
				Type:         "noul",
				Instructions: "The message conveys urgency or time-sensitivity",
				Criteria: map[string]string{
					"true":  "Message conveys urgency",
					"false": "No urgency",
				},
			},
		},
	}
	// 把结构体转成一行压缩 JSON
	jsonData, err := json.MarshalIndent(reqBody, "", "  ")
	if err != nil {
		fmt.Printf("JSON序列化失败: %v\n", err)
		return
	}
	fmt.Println("=== Request Body ===")
	fmt.Println(string(jsonData))
	// 打印空行，方便查看
	fmt.Println()
	// http.NewRequest 要一个能读的流
	// bytes.NewBuffer 就是把咱们的字节包成这个能读的流给它。
	req, err := http.NewRequest(http.MethodPost, apiURL, bytes.NewBuffer(jsonData))
	if err != nil {
		fmt.Printf("创建请求失败: %v\n", err)
		return
	}

	req.Header.Set("Authorization", "Bearer "+token)
	req.Header.Set("Content-Type", "application/json")

	// 带超时的 http client
	client := &http.Client{
		Timeout: 30 * time.Second,
	}
	// 发送请求
	resp, err := client.Do(req)
	if err != nil {
		fmt.Printf("请求发送失败: %v\n", err)
		return
	}
	// 关闭响应体
	// defer 就是标记这行代码，等它所在函数跑完、退出前，最后再执行，用来把响应体关掉，防止资源泄露。
	defer resp.Body.Close()
	// 把接口返回的响应流全部读完，变成字节数组存起来。
	// io 接口 网络io
	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Printf("读取响应失败: %v\n", err)
		return
	}
	// 把接口返回的响应流全部读完，变成字节数组存起来。
	fmt.Printf("=== Response Status: %s ===\n", resp.Status)
	fmt.Println(string(respBody))
}
