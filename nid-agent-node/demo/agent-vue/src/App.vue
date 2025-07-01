<template>
  <div>
    <h1>Chat</h1>
    <input type="text" v-model="text" @keyup.enter="send" />
    <button @click="send">Send</button>
    <div>{{message}}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const text = ref('')
const message = ref('')
const send = async () => {
  const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer`
        },
        body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [
                {
                    role: 'user',
                    content: text.value
                }
            ]
        })
    })
    const data = await res.json();
    message.value = data.choices[0].message.content
}
</script>
