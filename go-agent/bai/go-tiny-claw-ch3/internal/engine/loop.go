package engine

import (
	"context"
	"fmt"
	"log"

	"github.com/shunwuyu/go-tiny-claw-ch3/internal/provider"
	"github.com/shunwuyu/go-tiny-claw-ch3/internal/schema"
	"github.com/shunwuyu/go-tiny-claw-ch3/internal/tools"
)

// 结构体 用来替代类
type AgentEngine struct {
	// 提供 LLM 模型的接口  必须实现 LLMProvider 接口
	provider provider.LLMProvider
	registry tools.Registry
	WorkDir  string
	// 是否开启思考模式
	EnableThinking bool
}

// 构造函数
func NewAgentEngine(p provider.LLMProvider, r tools.Registry, workDir string, enableThinking bool) *AgentEngine {
	return &AgentEngine{
		provider:       p,
		registry:       r,
		WorkDir:        workDir,
		EnableThinking: enableThinking,
	}
}

func (e *AgentEngine) Run(ctx context.Context, userPrompt string) error {
	log.Printf("[Engine] 引擎启动，锁定工作区: %s\n", e.WorkDir)
	log.Printf("[Engine] 慢思考模式 (Thinking Phase): %v\n", e.EnableThinking)
	// 新建切片（slice），不是数组 长度可以动态变化 {} 代表字面量
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
	// 初始轮次为 0
	turnCount := 0

	for {
		// 每次循环增加 1 轮次
		turnCount++
		log.Printf("\n========== [Turn %d] 开始 ==========\n", turnCount)
		// 每次循环获取当前可用的工具列表
		availableTools := e.registry.GetAvailableTools()
		// `%v` 用来输出任意变量的值，Go 自动帮你选合适的展示方式。
		fmt.Printf("当前可用工具: %v\n", availableTools)

		// ================= Phase 1: Thinking =================
		if e.EnableThinking {
			log.Println("[Engine][Phase 1] 剥夺工具访问权，强制进入慢思考与规划阶段...")
			thinkResp, err := e.provider.Generate(ctx, contextHistory, nil) // 传入 nil 剥夺工具
			// 没传工具， 就返回思考的内容
			fmt.Println(thinkResp)

			if err != nil {
				return fmt.Errorf("Thinking 阶段生成失败: %w", err)
			}
			if thinkResp.Content != "" {
				fmt.Printf("🧠 [内部思考 Trace]: %s\n", thinkResp.Content)
				// 把思考的内容添加到上下文历史中
				// 每次思考后，都要把思考的内容添加到上下文历史中，因为模型需要根据思考的内容来采取行动。
				contextHistory = append(contextHistory, *thinkResp)
			}
		}

		// ================= Phase 2: Action =================
		log.Println("[Engine][Phase 2] 恢复工具挂载，等待模型采取行动...")
		actionResp, err := e.provider.Generate(ctx, contextHistory, availableTools)
		if err != nil {
			return fmt.Errorf("Action 阶段生成失败: %w", err)
		}

		contextHistory = append(contextHistory, *actionResp)

		if actionResp.Content != "" {
			fmt.Printf("🤖 [对外回复]: %s\n", actionResp.Content)
		}

		// ================= 执行判断 =================
		if len(actionResp.ToolCalls) == 0 {
			log.Println("[Engine] 模型未请求调用工具，任务宣告完成。")
			break
		}

		log.Printf("[Engine] 模型请求调用 %d 个工具...\n", len(actionResp.ToolCalls))
		// 循环遍历 actionResp.ToolCalls 这个切片
		// for 第一个参数是索引，第二个参数是元素值
		for _, toolCall := range actionResp.ToolCalls {
			log.Printf("  -> 🛠️ 执行工具: %s, 参数: %s\n", toolCall.Name, string(toolCall.Arguments))

			result := e.registry.Execute(ctx, toolCall)

			if result.IsError {
				log.Printf("  -> ❌ 工具执行报错: %s\n", result.Output)
			} else {
				log.Printf("  -> ✅ 工具执行成功 (返回 %d 字节)\n", len(result.Output))
			}

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
