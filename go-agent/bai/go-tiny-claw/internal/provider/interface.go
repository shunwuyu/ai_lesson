// Engine 需要知道去哪里调用大模型，去哪里执行工具
// 我们通过接口（Interface）来隔离底层实现。
package provider

import (
	// `context` 标准库，用来传递请求上下文req res、超时、取消信号，控制请求生命周期。
	"context"

	"github.com/shunwuyu/go-tiny-claw/internal/schema"
)

// LLMProvider 定义了与大模型通信的统一契约
// Go 必须先用 type 起个名字，再写 interface {}
type LLMProvider interface {
	// Generate 接收当前的上下文历史、可用工具列表，并发起一次大模型推理
	// 大写才能导出
	// `*` 是**指针**
	// 返回值类型 *schema.Message, error
	Generate(ctx context.Context, messages []schema.Message, availableTools []schema.ToolDefinition) (*schema.Message, error)
}
