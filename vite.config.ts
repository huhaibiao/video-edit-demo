/*
 * @Author: huhaibiao
 * @Date: 2023-04-21 22:11:20
 */
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
// https://vitejs.dev/config/

const pathSrc = path.resolve(__dirname, 'src')
export default defineConfig(async ({ command, mode }) => {
  return {
    base: './',
    server: {
      open: true,
      host: '0.0.0.0',
      headers: {
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Embedder-Policy': 'require-corp'
      },
      proxy: {}
    },
    resolve: {
      alias: {
        '@': pathSrc
      }
    },
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue'],
        resolvers: [
          ElementPlusResolver(), // Auto import icon components
          // 自动导入图标组件
          IconsResolver({
            prefix: 'Icon'
          })
        ],
        dts: path.resolve(pathSrc, 'auto-imports.d.ts')
      }),
      Components({
        resolvers: [
          IconsResolver({
            enabledCollections: ['ep']
          }),
          ElementPlusResolver()
        ],
        dts: path.resolve(pathSrc, 'components.d.ts')
      }),
      Icons({
        compiler: 'vue3',
        autoInstall: true
      })
    ],
    define: {
      __APP_ENV__: JSON.stringify(mode)
    }
  }
})
