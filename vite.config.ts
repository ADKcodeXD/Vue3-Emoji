import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import * as path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), AutoImport({ imports: ['vue'] })],
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
    }
  }
});
