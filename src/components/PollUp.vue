<template>
	<div v-if="Object.keys(renderData).length > 0" :class="$style.pollup" id="pollUpEl" ref="pollUpEl">
		<div>
			<div :class="$style.tabName" v-if="activeTab === 'recent'">
				<p style="margin: 0 5px">最近使用</p>
				<a :class="$style.deleteRecent" @click="deleteRecent">删除所有选项</a>
			</div>
			<p :class="$style.tabName" v-else>{{ activeTab }}</p>
			<div :class="$style.emojiContainer" ref="container">
				<template v-if="activeTab === 'recent'">
					<div
						:class="$style.emojiContainerItem"
						v-for="(emoji, index) in recentDataArr"
						:key="index"
						@click="clickEmoji(emoji)"
						:title="emoji.name"
						v-html="emojiSkin(emoji)"
					></div>
				</template>

				<template v-else>
					<div
						:class="$style.emojiContainerItem"
						v-for="(emoji, index) in renderData[activeTab]"
						:key="index"
						@click="clickEmoji(emoji)"
						:title="emoji.name"
						v-html="emojiSkin(emoji)"
					></div>
				</template>
			</div>
		</div>
		<div :class="$style.tabContainer" ref="tabcontainer">
			<!-- 最近使用过的的选项 -->
			<div v-if="needLocal" :class="[$style.tabItem, activeTab === 'recent' ? $style.active : '']" @click="() => changeTab('recent')">
				🔥
			</div>
			<div
				:class="[$style.tabItem, tab === activeTab ? $style.active : '']"
				v-for="tab in groupName"
				:title="tab"
				:key="tab"
				@click="changeTab(tab)"
			>
				{{ customIcon && customIcon[tab] ? customIcon[tab] : renderData[tab][0].emoji }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import EmojiData from '../assets/emojidata/emoji-data.json'
import SizeData from '../assets/options/SizeData.json'
import ThemeData from '../assets/options/ThemeData.json'
import { filterData } from '../utils/emojiFilter'
import { getItem, removeItem, setItem } from '../utils/storage'
import { saveToLocal } from '../utils/commonUtils'
import { Emoji } from '../types/type'
import { ref, computed, watchEffect, onMounted } from 'vue'

const Skin: Emoji.JsonData = {
	dark: '&#127999;',
	middark: '&#127998;',
	mid: '&#127997;',
	midlight: '&#127996;',
	light: '&#127995;',
	none: ''
}

const props = defineProps<{
	size: string
	theme: 'dark' | 'default'
	skin: 'dark' | 'middark' | 'mid' | 'midlight' | 'light' | 'none'
	disableGroup?: string[]
	optionsName?: Emoji.JsonData
	unicodeVersion?: number
	needLocal?: boolean
	defaultSelect?: string
	customSize?: Emoji.CustomSize
	customIcon?: Emoji.CustomIcon
	customTheme?: Emoji.CustomTheme
	customTab?: Emoji.JsonData
}>()

const emit = defineEmits(['clickEmoji'])

const emojiData: Emoji.JsonData = EmojiData
const sizeData: Emoji.JsonData = SizeData
const themeData: Emoji.JsonData = ThemeData
const groupName: string[] = []

const activeTab = ref('Smileys & Emotion')
const pollUpEl = ref<HTMLElement | null>(null)
const renderData = ref<Emoji.ObjectItem>({}) // Make renderData reactive
const recentData = ref<Emoji.ObjectItem>(getItem('emoji-recent') || null)
const tabcontainer = ref<HTMLElement | null>(null)
const container = ref<HTMLElement | null>(null)

const recentDataArr = computed(() => {
	return (recentData.value && recentData.value['recent']) || []
})

//过滤皮肤选项
const emojiSkin = (emoji: Emoji.EmojiItem) => {
	if (!emoji.skin_tone_support) return emoji.emoji
	else {
		if (!emoji.skin_tone_support_unicode_version) {
			return emoji.emoji
		} else {
			const skin = Number.parseInt(emoji.skin_tone_support_unicode_version) < 10 ? Skin[props.skin] : ''
			return `${emoji.emoji}${skin}`
		}
	}
}

const initRenderData = () => {
	renderData.value = filterData(emojiData, props.optionsName, props.unicodeVersion, props.disableGroup, props.customTab)
}

const initPollup = () => {
	groupName.length = 0 // Clear the array before populating
	for (let key in renderData.value) {
		groupName.push(key)
	}
	// 初始化最近使用的数据
	if (recentData.value === null && props.needLocal) {
		recentData.value = {
			recent: []
		}
		setItem('emoji-recent', recentData.value)
	}
	if (props.defaultSelect && (groupName.includes(props.defaultSelect) || (props.defaultSelect === 'recent' && props.needLocal))) {
		activeTab.value = props.defaultSelect
	} else {
		activeTab.value = groupName[0]
	}
}

// Modify changeTab to check if the tab exists
const changeTab = (tab: string) => {
	if (renderData.value[tab] || (tab === 'recent' && props.needLocal)) {
		activeTab.value = tab
	}
}

// 点击表情
const clickEmoji = (emoji: Emoji.EmojiItem) => {
	//增加一个最近使用的选项 来自本地存储
	if (props.needLocal) {
		saveToLocal(recentData, emoji)
	}
	emit('clickEmoji', emoji)
}

//删除所有最近使用过的emoji
const deleteRecent = () => {
	recentData.value['recent'] = []
	removeItem('emoji-recent')
}

//设置pollup弹出框的大小
const setSize = () => {
	if (pollUpEl.value) {
		let itemsize
		let height
		const padding = 10
		for (let key in sizeData[props.size]) {
			if (props.customSize && props.customSize[key]) pollUpEl.value.style.setProperty(`--${key}`, props.customSize[key])
			else pollUpEl.value.style.setProperty(`--${key}`, sizeData[props.size][key])
			switch (key) {
				case 'V3Emoji-itemSize':
					itemsize = (props.customSize && props.customSize[key]) || sizeData[props.size][key]
					break
				case 'V3Emoji-height':
					height = (props.customSize && props.customSize[key]) || sizeData[props.size][key]
					break
				default:
					break
			}
		}
		if (container.value) {
			let _height = parseInt(height) - parseInt(itemsize) * 2 - 2 * padding - parseInt(itemsize) / 2
			if (tabcontainer.value && tabcontainer.value.scrollWidth > tabcontainer.value.clientWidth) {
				_height = parseInt(height) - parseInt(itemsize) * 2 - 2 * padding - (parseInt(itemsize) / 2 + 4)
			}
			let style = container.value.style as any
			style['max-height'] = `${_height}px`
		}
	}
}

// 设置主题
const setTheme = () => {
	if (pollUpEl.value) {
		for (let key in themeData[props.theme]) {
			if (props.customTheme && props.customTheme[key]) pollUpEl.value.style.setProperty(`--${key}`, props.customTheme[key])
			else pollUpEl.value.style.setProperty(`--${key}`, themeData[props.theme][key])
		}
	}
}

initRenderData()

watchEffect(() => {
	initRenderData() // Re-initialize renderData when dependencies change
	initPollup()
	setSize()
	setTheme()
})

onMounted(() => {
	setSize()
	setTheme()
})
</script>

<style lang="scss" module>
@import '../assets/styles/V3Emoji.scss';
$padding: 10px;

.pollup {
	width: $width;
	height: $height;
	transition: all ease 0.3s;
	color: $fontColor;
	background-color: $backgroundColor;
	box-shadow: 3px 3px 10px $shadowColor;
	border-radius: 16px;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.tabName {
	font-size: $fontsize;
	height: $itemsize;
	margin: 6px 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.deleteRecent {
	color: rgb(49, 190, 255);
	cursor: pointer;
}

.emojiContainer {
	display: grid;
	grid-template-columns: repeat(auto-fill, calc($itemsize + 2 * $padding));
	justify-content: space-between;
	align-items: center;
	max-height: calc($height - $itemsize * 2 - 2 * $padding - 10px);
	overflow-y: auto;
}

.emojiContainerItem {
	padding: $padding;
	font-size: $fontsize;
	line-height: $itemsize;
	text-align: center;
	cursor: pointer;
	&:hover {
		background-color: $hoverColor;
	}
}

.tabContainer {
	width: 100%;
	height: calc($itemsize + 2 * $padding);
	overflow: auto;
	display: flex;
	background-color: $backgroundColor;
	box-shadow: 3px 3px 10px $shadowColor;
}

.tabItem {
	padding: $padding;
	font-size: $fontsize;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
}

.active {
	background-color: $activeColor;
}
</style>
