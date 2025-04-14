<template>
  <div id="app">
    <p>{{ $t('message.greeting') }}</p>
    <button @click="changeLocale('zh')">{{ $t('message.switchTo') }} {{ $t('message.chinese') }}</button>
    <button @click="changeLocale('en')">{{ $t('message.switchTo') }} {{ $t('message.english') }}</button>
    <button @click="changeLocale('ja')">{{ $t('message.switchTo') }} {{ $t('message.japanese') }}</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    changeLocale(locale) {
      this.$i18n.locale = locale;
    }
  }
}
</script>