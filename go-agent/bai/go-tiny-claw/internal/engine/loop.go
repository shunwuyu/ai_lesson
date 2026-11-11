// internal/engine/loop.go
package engine

import (
	"context"
	"fmt"
	"log"

	"github.com/shunwuyu/go-tiny-claw/internal/provider"
	"github.com/shunwuyu/go-tiny-claw/internal/schema"
	"github.com/shunwuyu/go-tiny-claw/internal/tools"
)

type AgentEngine struct {
	provider       provider.LLMProvider
	registry       tools.Registry
	WorkDir        string
	EnableThinking bool // 【新增】慢思考模式开关
}

func NewAgentEngine(p provider.LLMProvider, r tools.Registry, workDir string, enableThinking bool) *AgentEngine {
	return &AgentEngine{
		provider:       p,
		registry:       r,
		WorkDir:        workDir,
		EnableThinking: enableThinking,
	}
}

// internal/engine/loop.go (续)

func (e *AgentEngine) Run(ctx context.Context, userPrompt string) error {
	log.Printf("[Engine] 引擎启动，锁定工作区: %s\n", e.WorkDir)
	log.Printf("[Engine] 慢思考模式 (Thinking Phase): %v\n", e.EnableThinking)

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

	turnCount := 0

	for {
		turnCount++
		log.Printf("\n========== [Turn %d] 开始 ==========\n", turnCount)

		// 获取当前挂载的所有工具定义
		availableTools := e.registry.GetAvailableTools()

		// ====================================================================
		// Phase 1: 慢思考阶段 (Thinking) - 剥夺工具，强制规划
		// ====================================================================
		if e.EnableThinking {
			log.Println("[Engine][Phase 1] 剥夺工具访问权，强制进入慢思考与规划阶段...")

			// 核心机制：传入的 availableTools 为 nil！
			// 大模型看不到任何 JSON Schema，被迫只能输出纯文本的思考过程。
			thinkResp, err := e.provider.Generate(ctx, contextHistory, nil)
			if err != nil {
				return fmt.Errorf("Thinking 阶段生成失败: %w", err)
			}

			// 如果模型输出了思考过程，我们将其作为 Assistant 消息追加到上下文中
			if thinkResp.Content != "" {
				fmt.Printf("🧠 [内部思考 Trace]: %s\n", thinkResp.Content)
				contextHistory = append(contextHistory, *thinkResp)
			}
		}

		// ====================================================================
		// Phase 2: 行动阶段 (Action) - 恢复工具，顺着规划执行
		// ====================================================================
		log.Println("[Engine][Phase 2] 恢复工具挂载，等待模型采取行动...")

		// 此时的 contextHistory 中已经包含了上一阶段模型自己的 Thinking Trace。
		// 模型会顺着自己的逻辑，结合恢复的 availableTools 发起精准的工具调用。
		actionResp, err := e.provider.Generate(ctx, contextHistory, availableTools)
		if err != nil {
			return fmt.Errorf("Action 阶段生成失败: %w", err)
		}

		contextHistory = append(contextHistory, *actionResp)

		if actionResp.Content != "" {
			fmt.Printf("🤖 [对外回复]: %s\n", actionResp.Content)
		}

		// ====================================================================
		// 退出与执行逻辑 (与上一讲保持一致)
		// ====================================================================
		if len(actionResp.ToolCalls) == 0 {
			log.Println("[Engine] 模型未请求调用工具，任务宣告完成。")
			break
		}

		log.Printf("[Engine] 模型请求调用 %d 个工具...\n", len(actionResp.ToolCalls))

		for _, toolCall := range actionResp.ToolCalls {
			log.Printf("  -> 🛠️ 执行工具: %s, 参数: %s\n", toolCall.Name, string(toolCall.Arguments))

			result := e.registry.Execute(ctx, toolCall)

			if result.IsError {
				log.Printf("  -> ❌ 工具执行报错: %s\n", result.Output)
			} else {
				log.Printf("  -> ✅ 工具执行成功 (返回 %d 字节)\n", len(result.Output))
			}

			// 将工具执行的观察结果追加到 Context，准备进入下一轮
			observationMsg := schema.Message{
				Role:       schema.RoleUser,
				Content:    result.Output,
				ToolCallID: toolCall.ID,
			}
			contextHistory = append(contextHistory, observationMsg)
		}
	}

	return nil
}
