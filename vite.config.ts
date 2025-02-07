import type { ConfigEnv, UserConfig } from 'vite'
import path from 'node:path'
import process from 'node:process'
import { unheadVueComposablesImports } from '@unhead/vue'
import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { loadEnv } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'

export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root)

  return {
    base: env.VITE_APP_PUBLIC_PATH,

    server: {
      host: true,
      port: 7000,
      proxy: {
        '/api': {
          target: '',
          ws: false,
          changeOrigin: true,
        },
      },
    },

    plugins: [
      VueRouter({
        routesFolder: 'src/pages',
        dts: 'src/typed-router.d.ts',
      }),

      vue(),

      legacy({
        targets: ['defaults', 'not IE 11'],
      }),

      Components({
        extensions: ['vue'],
        resolvers: [],
        include: [/\.vue$/, /\.vue\?vue/],
        dts: 'src/components.d.ts',
      }),

      AutoImport({
        include: [
          /\.[tj]sx?$/,
          /\.vue$/,
          /\.vue\?vue/,
        ],
        imports: [
          'vue',
          VueRouterAutoImports,
          {
            'vue-router/auto': ['useLink'],
          },
          unheadVueComposablesImports,
        ],
        dts: 'src/auto-imports.d.ts',
      }),

      VueDevTools(),
    ],

    resolve: {
      alias: {
        '~@': path.join(__dirname, './src'),
        '@': path.join(__dirname, './src'),
        '~': path.join(__dirname, './src/assets'),
      },
    },

    build: {
      cssCodeSplit: false,
      chunkSizeWarningLimit: 2048,
    },
  }
}
