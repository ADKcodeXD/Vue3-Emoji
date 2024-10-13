import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import * as path from 'path'
import dts from 'vite-plugin-dts'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({ imports: ['vue'] }),
    dts({
      insertTypesEntry: true,
      copyDtsFiles: true,
      include: ['src/**/*.vue', 'src/**/*.ts', 'index.d.ts'],
      outputDir: 'dist/types',
      // 添加 .vue 文件的类型声明
      beforeWriteFile: (filePath, content) => {
        if (filePath.endsWith('.vue.d.ts')) {
          content = content.replace(
            /import type { DefineComponent } from 'vue'/g,
            "import { DefineComponent } from 'vue'"
          )
          content = `declare module '*.vue' {\n  import type { DefineComponent } from 'vue'\n  const component: DefineComponent<{}, {}, any>\n  export default component\n}\n\n${content}`
        }
        return { filePath, content }
      },
    }),
  ],
  css: {
    modules: {
      scopeBehaviour: 'local', // 默认行为是 'local'
      generateScopedName: '[name]__[local]___[hash:base64:5]', // 自定义生成的类名格式
      hashPrefix: 'Vue3Emoji', // 自定义 hash 前缀
      localsConvention: 'camelCaseOnly',
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/packages/index.ts'),
      name: 'V3Emoji',
      fileName: (format) => `Vue3Emoji.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
