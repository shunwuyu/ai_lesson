package main

import (
	// context 就是给协程传停止信号、超时时间，用来随时叫停任务的小令牌。
	// 用户暂停任务、关掉流式窗口
	"context"
	"fmt"
	"log"

	// os 包提供平台无关的操作系统基础接口
	// 用于文件、进程、环境变量等系统资源操作
	"os"

	"github.com/shunwuyu/go-tiny-claw-ch3/internal/engine"
	"github.com/shunwuyu/go-tiny-claw-ch3/internal/schema"
)

// 私有结构体
type mockProvider struct {
	//每一次从“组装 Prompt”到“追加观察结果”，我们称之为一个 Turn (轮次）
	turn int
}

// 实现 Provider 接口的 Generate 方法
// 函数**返回两个值**，第一个是指向 `schema.Message` 结构体的指针，第二个是错误。成功一般是 nil
func (m *mockProvider) Generate(ctx context.Context, msgs []schema.Message, tools []schema.ToolDefinition) (*schema.Message, error) {
	// 没有工具定义，直接回答
	if len(tools) == 0 {
		return &schema.Message{
			Role: schema.RoleAssistant,
			// 思考内容
			Content: "【推理中】目标是检查文件。我不能直接盲猜，我需要先调用 bash 工具执行 ls 命令，看看当前目录下有什么，然后再做定夺。",
		}, nil
	}
	// 轮数 + 1
	m.turn++
	// 第一次轮次，执行 bash 工具
	if m.turn == 1 {
		return &schema.Message{
			Role:    schema.RoleAssistant,
			Content: "我要执行我刚才计划的步骤了。",
			ToolCalls: []schema.ToolCall{
				// 二进制数据
				{ID: "call_123", Name: "bash", Arguments: []byte(`{"command": "ls -la"}`)},
			},
		}, nil
	}

	return &schema.Message{
		Role:    schema.RoleAssistant,
		Content: "根据工具返回的结果，我看到了 main.go，任务圆满完成！",
	}, nil
}

type mockRegistry struct{}

func (m *mockRegistry) GetAvailableTools() []schema.ToolDefinition {
	return []schema.ToolDefinition{{Name: "bash"}}
}

func (m *mockRegistry) Execute(ctx context.Context, call schema.ToolCall) schema.ToolResult {
	return schema.ToolResult{
		ToolCallID: call.ID,
		Output:     "-rw-r--r--  1 user group  234 Oct 24 10:00 main.go\n",
		IsError:    false,
	}
}

func main() {
	workDir, _ := os.Getwd()
	fmt.Println(workDir)
	// Go 没有类，mockProvider 是结构体（struct）
	// 会在堆上分配一块新内存，存放 mockProvider 结构体的值，然后拿到这块内存的地址。
	// p 的类型：*mockProvider的指针变量
	// `*p` 才是 `mockProvider` 结构体本身 `*p`：对指针 `p` 做**解引用**，拿到该地址上存放的原始值
	// 和new(mockProvider) 是一样的
	p := &mockProvider{}
	// 实现 Registry 接口的 GetAvailableTools 和 Execute 方法
	r := &mockRegistry{}

	eng := engine.NewAgentEngine(p, r, workDir, true)
	// `context.Background()` 是一个空的根上下文，没有超时、没有取消信号，一般用来当最顶层的起始令牌。
	err := eng.Run(context.Background(), "帮我检查当前目录的文件")
	if err != nil {
		log.Fatalf("引擎崩溃: %v", err)
	}

}
