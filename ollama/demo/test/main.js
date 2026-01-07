const url = 'http://localhost:11434/v1/chat/completions';
const headers = {
  'Authorization': 'Bearer ollama',
  'Content-Type': 'application/json'
};
const data = {
  model: 'deepseek-r1:1.5b',
  messages: [{ role: 'user', content: '你好' }]
};

fetch(url, {
  method: 'POST',
  headers,
  body: JSON.stringify(data)
})
  .then(res => res.json())
  .then(json => {
    console.log(json.choices[0].message);
  })
  .catch(err => console.error('Error:', err));