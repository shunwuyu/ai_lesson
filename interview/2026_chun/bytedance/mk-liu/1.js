class StreamMarkdownParser {
    constructor() {
      this.rawBuffer = '';
      // 标签栈，用来自动闭合
      this.tagStack = [];
    }
  
    // 流式追加字符
    feed(char) {
      this.rawBuffer += char;
      return this.render();
    }
  
    // 重置解析器
    reset() {
      this.rawBuffer = '';
      this.tagStack = [];
    }
  
    // 手动强制补全所有未闭合标签
    closeAllTags(html) {
      while (this.tagStack.length > 0) {
        const tag = this.tagStack.pop();
        html += `</${tag}>`;
      }
      return html;
    }
  
    render() {
      let str = this.rawBuffer;
      let html = '';
      let i = 0;
      const len = str.length;
  
      // 每次渲染清空栈，重新解析
      this.tagStack = [];
  
      while (i < len) {
        // 1. 换行 \n
        if (str[i] === '\n') {
          html += '<br>';
          i++;
          continue;
        }
  
        // 2. 标题 # 行首匹配
        if (str[i] === '#' && (i === 0 || str[i - 1] === '\n')) {
          let level = 0;
          while (i < len && str[i] === '#') {
            level++;
            i++;
          }
          level = Math.min(level, 6);
          // 跳过后面空格
          while (i < len && str[i] === ' ') i++;
  
          html += `<h${level}>`;
          this.tagStack.push(`h${level}`);
          continue;
        }
  
        // 3. 加粗 **
        if (str[i] === '*' && i + 1 < len && str[i + 1] === '*') {
          i += 2;
          if (this.tagStack.includes('strong')) {
            // 闭合加粗
            html += '</strong>';
            const idx = this.tagStack.indexOf('strong');
            if (idx > -1) this.tagStack.splice(idx, 1);
          } else {
            html += '<strong>';
            this.tagStack.push('strong');
          }
          continue;
        }
  
        // 4. 斜体 *
        if (str[i] === '*') {
          i++;
          if (this.tagStack.includes('em')) {
            html += '</em>';
            const idx = this.tagStack.indexOf('em');
            if (idx > -1) this.tagStack.splice(idx, 1);
          } else {
            html += '<em>';
            this.tagStack.push('em');
          }
          continue;
        }
  
        // 普通字符
        html += str[i];
        i++;
      }
  
      // 关键：解析完自动补所有未闭合标签
      html = this.closeAllTags(html);
      return html;
    }
  }

  const parser = new StreamMarkdownParser();

// 模拟流式一段一段吐
const content = "# 这是标题\n这是**加粗文本**和*斜体文本*";

for (const ch of content) {
  const res = parser.feed(ch);
  console.log('当前解析结果：', res);
}