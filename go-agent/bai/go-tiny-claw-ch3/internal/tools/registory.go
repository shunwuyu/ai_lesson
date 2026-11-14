package tools

import (
	"context"

	"github.com/shunwuyu/go-tiny-claw-ch3/internal/schema"
)

type Registry interface {
	GetAvailableTools() []schema.ToolDefinition
	Execute(ctx context.Context, call schema.ToolCall) schema.ToolResult
}
