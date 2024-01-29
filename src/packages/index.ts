import V3Emoji from '../components/V3Emoji.vue'
import { App } from 'vue'

V3Emoji.install = (app: App) => {
	app.component(V3Emoji.name, V3Emoji)
}

export default V3Emoji
