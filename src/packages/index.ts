import type { App } from 'vue';
import V3Emoji from '../components/V3Emoji.vue';
// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const Vue3Emoji = {
  install: (app: App<Element>) => {
    app.component('V3Emoji', V3Emoji);
  }
};
export default Vue3Emoji;
