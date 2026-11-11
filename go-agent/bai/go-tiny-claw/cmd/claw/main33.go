package main

import (
	"context"
	"log"

	// os 包提供了操作操作系统相关功能的函数
	"os"

	"github.com/shunwuyu/go-tiny-claw/internal/engine"
	"github.com/shunwuyu/go-tiny-claw/internal/schema"
)

// 这正是 Go 接口的特性： 隐式实现 。Go 没有`implements` 关键字，一个类型只要方法签名和接口完全一致，就自动满足它，无需显式声明。

// 约束并没有消失，只是 推迟到了使用点 ： main.go#L68 的`engine.NewAgentEngine(p, r, workDir)` 参数类型是`LLMProvider` ，编译器在这里检查`*mockProvider` 是否实现了接口——少个方法、签名不对，这行直接编译报错。

// 这就是 Go 的「鸭子类型」：`mockProvider` 甚至不知道`LLMProvider` 的存在，两边零耦合（注意 main.go 也没 import`provider` 包）。好处是测试替身不用依赖被模拟的包。
// 接口只约束了方法
// ==========================================
// 1. 伪造的大模型 Provider
// ==========================================
type mockProvider struct {
	turn int
}

// 模拟大模型的响应：第一轮请求执行 bash，第二轮输出最终结果
// `(m *mockProvider)` 叫做 **指针接收者（pointer receiver）**
// 给 `*mockProvider` 这个类型绑定一个方法 `Generate`
func (m *mockProvider) Generate(ctx context.Context, msgs []schema.Message, _ []schema.ToolDefinition) (*schema.Message, error) {
	m.turn++
	if m.turn == 1 {
		return &schema.Message{
			Role:    schema.RoleAssistant,
			Content: "让我来看看当前目录下有什么文件。",
			ToolCalls: []schema.ToolCall{
				{ID: "call_123", Name: "bash", Arguments: []byte(`{"command": "ls -la"}`)},
			},
		}, nil
	}
	// 第二轮输出最终结果
	return &schema.Message{
		Role:    schema.RoleAssistant,
		Content: "我看到了文件列表，里面包含 main.go，任务完成！",
	}, nil
}

// ==========================================
// 2. 伪造的 Tool Registry
// ==========================================
type mockRegistry struct{}

func (m *mockRegistry) GetAvailableTools() []schema.ToolDefinition { return nil }

func (m *mockRegistry) Execute(ctx context.Context, call schema.ToolCall) schema.ToolResult {
	// 直接返回一段伪造的终端输出
	return schema.ToolResult{
		ToolCallID: call.ID,
		Output:     "-rw-r--r--  1 user group  234 Oct 24 10:00 main.go\n",
		IsError:    false,
	}
}

// ==========================================
// 3. 组装运行
// ==========================================
func main() {
	// 获取当前执行目录作为 WorkDir 物理边界
	workDir, _ := os.Getwd()
	// `:=` 短变量声明 声明变量 + 自动推导类型 + 赋值
	// 实例化大模型 Provider
	// & 取地址符

	p := &mockProvider{}
	// 实例化工具注册器
	r := &mockRegistry{}

	// 实例化核心引擎
	eng := engine.NewAgentEngine(p, r, workDir)

	// 发起任务指令
	// **空的基础上下文**，没有超时、没有取消，拿来当默认底版用。
	err := eng.Run(context.Background(), "帮我检查当前目录的文件")
	if err != nil {
		log.Fatalf("引擎崩溃: %v", err)
	}
}
