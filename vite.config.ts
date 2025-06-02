// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/dumbs_diary/', // ✅ 꼭 본인의 레포 이름으로 변경하세요
})
