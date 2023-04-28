import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import * as path from 'path';
import dts from 'vite-plugin-dts'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), AutoImport({ imports: ['vue'] }),dts()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/packages/index.ts'),
      name: 'V3Emoji',
      fileName: format => `Vue3Emoji.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    },
  },
});
