<template>
    <div class="h-full">
        <ChatConversation :messages="messages"/>
       <NuxtPage /> 
    </div>
</template>
<script setup>
const messages = reactive([{
    type: 'user',
    message: '你好'
}, {
    type: 'bot',
    message:`# Hello`
}])
</script>