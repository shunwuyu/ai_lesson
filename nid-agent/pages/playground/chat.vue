<template>
    <div>
        <h1>Chat</h1>
        <input v-model="text" type="text" @keyup.enter="send">
        <button @click="send">Send</button>
        <p>{{message}}</p>
    </div>
</template>

<script setup lang="ts">
const text = ref('')
const message = ref('')
const send = async () => {
    const response = await $fetch('/api/chat', {
        method: 'POST',
        body: {
            messages: [
                {
                    role: 'system',
                    content: 'you are a help assistant, created by startupintell.'
                },
                {
                    role: 'user',
                    content: 'my name is wanghao.'
                },
                {
                    'role': 'user',
                    content: text.value
                }
                
            ]
        }
    })

    message.value = response.choices[0].message.content ?? ''
}
</script>