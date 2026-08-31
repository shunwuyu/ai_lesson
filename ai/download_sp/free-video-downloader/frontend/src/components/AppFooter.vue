<template>
  <footer class="bg-white border-t border-border-light py-8">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <!-- 底部关键词友好描述 -->
      <div class="text-center mb-6">
        <p class="text-sm text-text-secondary leading-relaxed max-w-3xl mx-auto">
          <strong>SaveAny</strong> — 免费在线万能视频下载器，支持
          <a href="#features" class="text-primary hover:underline" title="YouTube视频下载">YouTube</a>、
          <a href="#features" class="text-primary hover:underline" title="Bilibili视频下载">Bilibili</a>、
          <a href="#features" class="text-primary hover:underline" title="抖音视频下载">抖音</a>、
          <a href="#features" class="text-primary hover:underline" title="TikTok视频下载">TikTok</a>
          等 1800+ 平台视频下载。提供
          <a href="#features" class="text-primary hover:underline" title="AI视频总结功能">AI 视频总结</a>、思维导图生成、字幕下载等智能功能。
        </p>
      </div>
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <a href="/" class="flex items-center gap-2" title="SaveAny 首页">
          <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span class="text-sm font-medium text-text-primary">SaveAny</span>
        </a>
        <p class="text-xs text-text-muted text-center leading-relaxed">
          本工具仅供学习交流使用，请尊重视频版权，勿用于商业用途。下载内容的版权归原作者所有。
        </p>
        <p class="text-xs text-text-muted">
          &copy; {{ new Date().getFullYear() }} SaveAny
        </p>
      </div>
    </div>
  </footer>
</template>
