document.addEventListener('DOMContentLoaded', function() {
    const modeBtns = document.querySelectorAll('.mode-btn');
    const actionBtn = document.getElementById('action-btn');
    const inputArea = document.getElementById('input-area');
    const resultArea = document.getElementById('result-area');
    const languageSelector = document.getElementById('language-selector');
    const sourceLanguage = document.getElementById('source-language');
    const targetLanguage = document.getElementById('target-language');
    let currentMode = 'translate';
    let detectedLanguage = 'auto';

    // 模式切换处理
    modeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const mode = this.dataset.mode;
            modeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentMode = mode;
            actionBtn.textContent = mode === 'translate' ? '翻译' : '总结';
            
            // 切换语言选择器的显示状态
            languageSelector.classList.toggle('hidden', mode !== 'translate');
            
            if (mode === 'summary') {
                // 获取当前页面内容
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.scripting.executeScript({
                        target: {tabId: tabs[0].id},
                        function: () => document.body.innerText
                    }, function(result) {
                        inputArea.value = result[0].result;
                    });
                });
            }
        });
    });

    // 语言选择处理
    sourceLanguage.addEventListener('change', function() {
        if (this.value === targetLanguage.value && this.value !== 'auto') {
            // 如果源语言和目标语言相同，自动切换目标语言
            const langs = ['zh', 'en', 'ja'];
            const currentIndex = langs.indexOf(this.value);
            const nextIndex = (currentIndex + 1) % langs.length;
            targetLanguage.value = langs[nextIndex];
        }
    });

    targetLanguage.addEventListener('change', function() {
        if (this.value === sourceLanguage.value && sourceLanguage.value !== 'auto') {
            // 如果目标语言和源语言相同，自动切换源语言
            sourceLanguage.value = 'auto';
        }
    });

    // 选中文本自动填充和语言检测
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            function: () => window.getSelection().toString()
        }, async function(result) {
            if (result[0].result) {
                const text = result[0].result;
                inputArea.value = text;
                // 自动检测语言
                if (sourceLanguage.value === 'auto') {
                    detectedLanguage = await detectLanguage(text);
                }
            }
        });
    });

    // 语言检测函数
    async function detectLanguage(text) {
        try {
            const response = await fetch(config.KIMI_API_ENDPOINT + '/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${config.KIMI_API_KEY}`
                },
                body: JSON.stringify({
                    messages: [{
                        role: 'user',
                        content: config.DETECT_PROMPT + text
                    }],
                    model: 'moonshot-v1-8k',
                    temperature: 0.3
                })
            });

            const data = await response.json();
            if (data.choices && data.choices[0]) {
                const lang = data.choices[0].message.content.trim().toLowerCase();
                return ['zh', 'en', 'ja'].includes(lang) ? lang : 'auto';
            }
        } catch (error) {
            console.error('语言检测错误:', error);
        }
        return 'auto';
    }

    // API调用函数
    async function callKimiAPI(text, mode) {
        try {
            if (mode === 'translate') {
                // 如果是自动检测，使用检测到的语言
                const actualSourceLang = sourceLanguage.value === 'auto' ? detectedLanguage : sourceLanguage.value;
                const prompt = `将以下${config.LANGUAGE_NAMES[actualSourceLang]}文本翻译成${config.LANGUAGE_NAMES[targetLanguage.value]}：\n${text}`;

                const response = await fetch(config.KIMI_API_ENDPOINT + '/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${config.KIMI_API_KEY}`
                    },
                    body: JSON.stringify({
                        messages: [{
                            role: 'user',
                            content: prompt
                        }],
                        model: 'moonshot-v1-8k',
                        temperature: 0.7
                    })
                });

                const data = await response.json();
                if (data.choices && data.choices[0]) {
                    return data.choices[0].message.content;
                }
            } else {
                // 总结模式
                const response = await fetch(config.KIMI_API_ENDPOINT + '/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${config.KIMI_API_KEY}`
                    },
                    body: JSON.stringify({
                        messages: [{
                            role: 'user',
                            content: config.SUMMARY_PROMPT + text
                        }],
                        model: 'moonshot-v1-8k',
                        temperature: 0.7
                    })
                });

                const data = await response.json();
                if (data.choices && data.choices[0]) {
                    return data.choices[0].message.content;
                }
            }
            throw new Error('API返回格式错误');
        } catch (error) {
            console.error('API调用错误:', error);
            return '处理失败: ' + error.message;
        }
    }

    // 处理按钮点击
    actionBtn.addEventListener('click', async function() {
        const text = inputArea.value.trim();
        if (!text) {
            resultArea.textContent = '请输入要处理的文本';
            return;
        }

        actionBtn.disabled = true;
        resultArea.textContent = '处理中...';

        try {
            const result = await callKimiAPI(text, currentMode);
            resultArea.textContent = result;
        } catch (error) {
            resultArea.textContent = '处理失败: ' + error.message;
        } finally {
            actionBtn.disabled = false;
        }
    });
}); 