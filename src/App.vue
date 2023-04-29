<script setup lang="ts">
import V3Emoji from './components/V3Emoji.vue'
import { Emoji } from './types/type'
const inputText = ref('')
const clickEmoji = (val: any) => {
	clickEvent.value = val
	console.log(val)
}
const optionsName = {
	'Smileys & Emotion': '笑脸&表情',
	'Food & Drink': '食物&饮料',
	'Animals & Nature': '动物&自然',
	'Travel & Places': '旅行&地点',
	'People & Body': '人物&身体',
	Objects: '物品',
	Symbols: '符号',
	Flags: '旗帜',
	Activities: '活动'
}
const disableGroup = ['食物&饮料']
const abc = ref('这里是双向绑定的值')
const clickEvent = ref('')
const customIcon: Emoji.JsonData = {
	'Smileys & Emotion': '😚',
	'Food & Drink': '🍔',
	'Animals & Nature': '🐶',
	Activities: '🎉',
	'Travel & Places': '🚗',
	Objects: '💰'
}
const customTab: Emoji.ObjectItem = {
	我的自定义板块: [
		{
			emoji: '🍔',
			name: '汉堡包'
		},
		{
			emoji: '🍟',
			name: '薯条'
		}
	]
}
const customSize: Emoji.CustomSize = {
	'V3Emoji-width': '300px',
	'V3Emoji-height': '20rem',
	'V3Emoji-fontSize': '1rem',
	'V3Emoji-itemSize': '50px'
}
const customTheme: Emoji.CustomTheme = {
	'V3Emoji-hoverColor': '#ff5500',
	'V3Emoji-activeColor': '#99ff77',
	'V3Emoji-shadowColor': 'rgba(255,255,0,0.5)',
	'V3Emoji-backgroundColor': '#000000',
	'V3Emoji-fontColor': '#ffffff'
}
const disableGroup2 = [
	'Smileys & Emotion',
	'Food & Drink',
	'Animals & Nature',
	'Travel & Places',
	'People & Body',
	'Objects',
	'Symbols',
	'Flags',
	'Activities'
]
</script>

<template>
	<div class="container">
		<div class="test">
			<V3Emoji :customIcon="customIcon" size="small" default-select="recent" />
			<p>small</p>
		</div>
		<div class="test">
			<V3Emoji :customIcon="customIcon" size="mid" default-select="Objects" />
			<p>mid</p>
		</div>
		<div class="test">
			<V3Emoji size="big" />
			<p>big</p>
		</div>
		<div class="test">
			<V3Emoji size="big" :custom-size="customSize" />
			<p>customSize</p>
		</div>
		<div class="test">
			<V3Emoji size="mid" :custom-theme="customTheme" />
			<p>customTheme</p>
		</div>
		<div class="test">
			<V3Emoji size="mid" :custom-icon="customIcon" />
			<p>customIcon</p>
		</div>
		<div class="test">
			<V3Emoji size="mid" :custom-tab="customTab" :disable-group="disableGroup2" />
			<p>customTab</p>
		</div>
	</div>
	<div id="app">
		<div>
			<h1>输入你的emoji</h1>
			<div class="text-area">
				<V3Emoji
					:disable-group="disableGroup"
					@click-emoji="clickEmoji"
					:options-name="optionsName"
					:recent="true"
					default-select="我的自定义板块"
					:fulldata="true"
					:textArea="true"
					:keep="false"
					inputType="textarea"
					:customIcon="customIcon"
					size="small"
					fix-pos="upcenter"
					:customTab="customTab"
					v-model="abc"
				/>
			</div>
			<input style="width: 100%; margin-top: 10px" v-model="abc" />
			<button @click="abc = ''">清空</button>
		</div>
		<h2>你当前点击的是</h2>
		{{ clickEvent }}
	</div>
</template>

<style scoped>
#app {
	display: flex;
	width: 100%;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
.text-area {
	width: 800px;
	height: 300px;
}
.container {
	display: flex;
	justify-content: space-between;
	margin: 20px;
	flex-wrap: wrap;
	.test {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
}
</style>
