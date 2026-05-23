// 数据
const users = [
    {
        "id": 1,
        "name": "过宇鑫",
        "hometown": "进贤"
    },
    {
        "id": 2,
        "name": "彭威",
        "hometown": "宜春"
    },
    {
        "id": 3,
        "name": "徐超",
        "hometown": "宜春"
    }
];

const tableBody = document.querySelector('table tbody');
const oForm = document.forms['aiForm'];
const oMessage = document.getElementById('message');

tableBody.innerHTML = users.map(user => `
<tr>
    <td>${user.id}</td>
    <td>${user.name}</td>
    <td>${user.hometown}</td>
</tr>
`).join('');

oForm.addEventListener('submit', async (e) => {
    // 事件对象
    // console.log(e);
    e.preventDefault(); // 阻止表单默认行为
    oForm.btn.disabled = true;

    const question = oForm.question.value.trim();
    if (!question) {
      alert('请输入问题');
      return;
    }
    console.log(question)

    const url = 'https://api.deepseek.com/chat/completions';

    const requestData = {
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: `
            ${JSON.stringify(users)}
            请根据上面的JSON数据，回答${question} 这个问题    
            ` }
        ],
        model: "deepseek-v4-pro",
        stream: false
    };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer`
            },
            body: JSON.stringify(requestData)
        })
        const result = await response.json();
        const answer = result.choices[0].message.content;
        // console.log("AI 回答：", answer);
        oMessage.innerHTML = answer;
        // oForm.btn.disabled = false;
    } catch(err) {
        console.log(err);
        oMessage.innerHTML = '请求失败';
        // oForm.btn.disabled = false;
    } finally {
        oForm.btn.disabled = false;
    }
    
})
