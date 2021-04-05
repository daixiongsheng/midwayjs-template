import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient({})
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import hooks from '@midwayjs/vite-plugin-hooks'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [hooks(), reactRefresh()],
})
