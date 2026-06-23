import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    // IIFE 输出：避免 Android WebView 在 file:// 协议下拦截 ES Modules（CORS 限制）
    // 问卷为单入口应用，Vite 默认已输出单文件，IIFE 包装仅增加 ~50 字节
    rollupOptions: {
      output: {
        format: 'iife',
      },
    },
  },
})
