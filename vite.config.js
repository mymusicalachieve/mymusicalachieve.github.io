import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // 用户站点仓库 username.github.io 部署在域名根路径，必须为 '/'
  // 若将来改为「项目站点」仓库 musical_archive 且 URL 为 /musical_archive/，再改为 '/musical_archive/'
  base: '/',
})
