// 同目录下所有文件归属同一个包，使用目录名作为包名，按目录组织代码
package schema

// 导入 JSON 编码/解码器
// 标准库 统一放各种序列化、转码工具包，定义统一规范
// 负责把 Go 的结构体、map 转成 JSON 字符串，也能把 JSON 字符串转回 Go 里面的数据
import "encoding/json"

// 定义角色类型
type Role string

const (
	// 系统角色 模块化输出
	RoleSystem Role = "system"
	// 用户角色
	RoleUser Role = "user"
	// 助手角色
	RoleAssistant Role = "assistant"
)

// 没有 ToolCalls：助手本轮不调用工具，直接回答；
// 有 ToolCalls：助手决定调用工具，发出工具调用请求；
// 有 ToolCallID：工具执行完毕，返回结果给大模型，用来关联之前那一次工具调用。
type Message struct {
	// 序列化字段
	Role    Role   `json:"role"`
	Content string `json:"content"`
	// omitempty 如果为空，不输出
	ToolCalls  []ToolCall `json:"tool_calls,omitempty"`
	ToolCallID string     `json:"tool_call_id,omitempty"`
}

type ToolCall struct {
	ID   string `json:"id"`
	Name string `json:"name"`
	// 原样暂存一段原始 JSON 字节
	// [] byte（字节切片）
	Arguments json.RawMessage `json:"arguments"`
}

type ToolResult struct {
	ToolCallID string `json:"tool_call_id"`
	Output     string `json:"output"`
	IsError    bool   `json:"is_error"`
}

type ToolDefinition struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	// 灵活传入任意结构的参数规约
	InputSchema interface{} `json:"input_schema"`
}
