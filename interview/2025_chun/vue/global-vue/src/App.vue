<template>
  <div id="app">
    <p>{{ $t('message.greeting') }}</p>
    <button @click="switchLanguage('zh')">{{ $t('message.switchTo') }} {{ $t('message.chinese') }}</button>
    <button @click="switchLanguage('en')">{{ $t('message.switchTo') }} {{ $t('message.english') }}</button>
    <button @click="switchLanguage('ja')">{{ $t('message.switchTo') }} {{ $t('message.japanese') }}</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    switchLanguage(lang) {
      this.$root.switchLanguage(lang);
    }
  }
}
</script>