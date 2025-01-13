<template>
  <div id="app">
    <HelloJSX msg="Hello from JSX!" />
  </div>
</template>

<script>
import HelloJSX from './components/HelloJSX.jsx';

export default {
  name: 'App',
  components: {
    HelloJSX,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>