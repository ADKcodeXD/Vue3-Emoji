import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import * as path from 'path'
import dts from 'vite-plugin-dts'
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), AutoImport({ imports: ['vue'] }), dts()],
	css: {
		modules: {
			scopeBehaviour: 'local', // 默认行为是 'local'
			generateScopedName: '[name]__[local]___[hash:base64:5]', // 自定义生成的类名格式
			hashPrefix: 'Vue3Emoji' // 自定义 hash 前缀
		}
	},
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
})
