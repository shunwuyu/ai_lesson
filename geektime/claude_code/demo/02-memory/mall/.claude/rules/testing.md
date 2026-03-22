---
paths:
  - "src/**/*.test.tsx"
  - "src/**/*.test.ts"
---

# 测试规范

- 使用 Vitest + React Testing Library
- 测试文件放在同目录: `Button.test.tsx`
- 优先测试用户行为，而非实现细节

```typescript
// ✅ 好
expect(screen.getByRole('button')).toBeEnabled();

// ❌ 不好
expect(component.state.isLoading).toBe(false);