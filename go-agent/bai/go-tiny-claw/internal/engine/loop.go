package engine

import (
	"context"
	"fmt"
	"log"

	"github.com/shunwuyu/go-tiny-claw/internal/provider"
	"github.com/shunwuyu/go-tiny-claw/internal/schema"
	"github.com/shunwuyu/go-tiny-claw/internal/tools"
)

// AgentEngine 是微型 OS 的核心驱动
type AgentEngine struct {
	// 私有字段，外部不能直接访问
	provider provider.LLMProvider
	registry tools.Registry

	// WorkDir (工作区): 借鉴 OpenClaw 的理念，Agent 必须有一个明确的物理边界
	WorkDir string
}

// NewAgentEngine 创建一个 AgentEngine 实例
// *AgentEngine 是指针类型，返回类型是这个地址
// New 开头一般是**构造函数**
func NewAgentEngine(p provider.LLMProvider, r tools.Registry, workDir string) *AgentEngine {
	// 新建结构体，拿它的地址。
	return &AgentEngine{
		provider: p,
		registry: r,
		WorkDir:  workDir,
	}
}

// Run 启动 Agent 的生命周期
// AgentEngine的方法
// Go 习惯靠返回 error 告诉外面有没有出错，error 不为空就是失败了。 为空就是成功了
func (e *AgentEngine) Run(ctx context.Context, userPrompt string) error {
	log.Printf("[Engine] 引擎启动，锁定工作区: %s\n", e.WorkDir)

	// 1. 初始化会话的 Context (上下文内存)
	// 在真实的场景中，这里会由动态 Prompt 组装器加载 AGENTS.md。目前我们先硬编码。
	contextHistory := []schema.Message{
		{
			Role:    schema.RoleSystem,
			Content: "You are go-tiny-claw, an expert coding assistant. You have full access to tools in the workspace.",
		},
		{
			Role:    schema.RoleUser,
			Content: userPrompt,
		},
	}
	// 短变量声明 一边定义变量 turnCount，一边给它赋值 0 只能在函数里面用，自动帮你推断类型。
	// 推断为 int 类型，后面不能改
	turnCount := 0

	// 2. The Main Loop: 心跳开始 (标准的 ReAct 循环)
	for {
		turnCount++
		log.Printf("========== [Turn %d] 开始 ==========\n", turnCount)

		// 获取当前挂载的所有工具定义
		availableTools := e.registry.GetAvailableTools()

		// 向大模型发起推理请求 (包含 Reasoning)
		log.Println("[Engine] 正在思考 (Reasoning)...")
		responseMsg, err := e.provider.Generate(ctx, contextHistory, availableTools)
		if err != nil {
			return fmt.Errorf("模型生成失败: %w", err)
		}

		// 将模型的响应完整追加到上下文历史中
		// `*responseMsg` 就是把指针指向的结构体原样拿出来，加到切片里
		contextHistory = append(contextHistory, *responseMsg)

		// 如果模型回复了纯文本，打印出来 (这通常是它的思考过程，或是最终结果)
		if responseMsg.Content != "" {
			fmt.Printf("🤖 模型: %s\n", responseMsg.Content)
		}

		// 3. 退出条件判断
		// 如果模型没有请求任何工具调用，说明它认为任务已经完成，跳出循环。
		if len(responseMsg.ToolCalls) == 0 {
			log.Println("[Engine] 任务完成，退出循环。")
			break
		}

		// 4. 执行行动 (Action) 与 获取观察结果 (Observation)
		log.Printf("[Engine] 模型请求调用 %d 个工具...\n", len(responseMsg.ToolCalls))

		for _, toolCall := range responseMsg.ToolCalls {
			log.Printf("  -> 🛠️ 执行工具: %s, 参数: %s\n", toolCall.Name, string(toolCall.Arguments))

			// 通过 Registry 路由并执行底层工具
			result := e.registry.Execute(ctx, toolCall)

			if result.IsError {
				log.Printf("  -> ❌ 工具执行报错: %s\n", result.Output)
			} else {
				log.Printf("  -> ✅ 工具执行成功 (返回 %d 字节)\n", len(result.Output))
			}

			// 将工具执行的观察结果 (Observation) 封装为 User Message 追加到上下文中
			// 注意：ToolCallID 必须携带！这是维系大模型推理链条的关键
			observationMsg := schema.Message{
				Role:       schema.RoleUser,
				Content:    result.Output,
				ToolCallID: toolCall.ID,
			}
			contextHistory = append(contextHistory, observationMsg)
		}

		// 循环回到开头，模型将带着新加入的 Observation 继续它的下一轮思考...
	}
	// nil 表示没有错误发生，成功了
	return nil
}
