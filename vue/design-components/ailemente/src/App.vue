<script setup lang="ts">
import { ref } from 'vue'
const showDialog = ref<boolean>(false)
</script>

<template>
  <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">
          Aside
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
    <hr>
    <el-container>
      <el-aside width="200px">
        Aside
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <button @click="showDialog=true">open</button>
            <el-dialog v-if="showDialog">
              <iframe
                src="//player.bilibili.com/player.html?aid=673762230&bvid=BV1pU4y1G7VX&cid=358701287&page=1"
                scrolling="no"
                border="0"
                frameborder="no"
                framespacing="0"
                allowfullscreen="true"
              />
              <el-button @click="showDialog=false">
                close
              </el-button>
            </el-dialog>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>


</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
