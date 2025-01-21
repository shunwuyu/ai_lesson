<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <header class="bg-blue-500 text-white p-4">
      <h1 class="text-xl font-bold">我的网站</h1>
    </header>

    <!-- Main Content -->
    <main class="flex-grow flex">
      <aside class="w-1/4 bg-gray-200 p-4">
        <nav>
          <ul>
            <li>链接 1</li>
            <li>链接 2</li>
            <li>链接 3</li>
          </ul>
        </nav>
      </aside>
      <section class="w-3/4 p-4">
        <p>这里是主要内容。</p>
      </section>
    </main>

    <!-- Footer -->
    <footer class="bg-blue-500 text-white p-4">
      <p>&copy; 2023 我的网站</p>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>