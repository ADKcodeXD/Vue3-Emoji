<template>
	<div class="pollup" ref="pollUpEl" :style="posVar">
		<div class="tab-name" v-if="activeTab === 'recent'">
			<p sytle="margin:0 5px;">最近使用</p>
			<a class="delete-recent" @click="deleteRecent">删除所有选项</a>
		</div>
		<p class="tab-name" v-else>{{ activeTab }}</p>
		<div class="emoji-container">
			<template v-if="activeTab === 'recent'">
				<div
					class="emoji-container-item"
					v-for="(emoji, index) in recentData['recent']"
					:key="index"
					@click="clickEmoji(emoji)"
					:title="emoji.name"
					v-html="emojiSkin(emoji)"
				></div>
			</template>

			<template v-else>
				<div
					class="emoji-container-item"
					v-for="(emoji, index) in renderData[activeTab]"
					:key="index"
					@click="clickEmoji(emoji)"
					:title="emoji.name"
					v-html="emojiSkin(emoji)"
				></div>
			</template>
		</div>
		<div class="tab-container">
			<!-- 最近使用过的的选项 -->
			<div class="tab-item" v-if="needLocal" @click="changeTab('recent')" :class="{ active: activeTab === 'recent' }">🔥</div>
			<div class="tab-item" v-for="tab in groupName" :title="tab" :key="tab" @click="changeTab(tab)" :class="{ active: tab === activeTab }">
				{{ customIcon && customIcon[tab] ? customIcon[tab] : renderData[tab][0].emoji }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import '../assets/styles/V3Emoji.scss'
import EmojiData from '../assets/emojidata/emoji-data.json'
import SizeData from '../assets/options/SizeData.json'
import ThemeData from '../assets/options/ThemeData.json'
import { filterData } from '../utils/emojiFilter'
import { getItem, removeItem, setItem } from '../utils/storage'
import { saveToLocal } from '../utils/commonUtils'
import { Emoji } from '../types/type'

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
	fixPos?: Emoji.FixType
}>()

const emit = defineEmits(['clickEmoji'])
const emojiData: Emoji.JsonData = EmojiData
const sizeData: Emoji.JsonData = SizeData
const themeData: Emoji.JsonData = ThemeData

const activeTab = ref('Smileys & Emotion')
const pollUpEl = ref<HTMLElement>()
const observe = ref<ResizeObserver>()
const renderData = filterData(emojiData, props.optionsName, props.unicodeVersion, props.disableGroup, props.customTab)
const recentData = ref<Emoji.ObjectItem>(getItem('emoji-recent') || null)
const groupName: string[] = []

const posVar = ref({})

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

// 初始化pollup所需的数据
const initPollup = () => {
	for (let key in renderData) {
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

// 切换tab
const changeTab = (tab: string) => {
	activeTab.value = tab
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

// 改变位置
const changePos = () => {
	if (pollUpEl.value) {
		// 这里就是打开弹出层 如果检测到上方空间不够 那就移动到下面
		if (pollUpEl.value.getBoundingClientRect().top < 0) {
			posVar.value = { bottom: 'unset', top: '50px' }
		}
		// 如果检测到左边空间不够 那就移动到右边 如果空间不足则不移动
		if (pollUpEl.value.getBoundingClientRect().left < 0) {
			posVar.value = { left: '0px', right: 'unset' }
		}
		// 如果检测到右边空间不够 那就移动到左边 如果空间不足则不移动
		if (pollUpEl.value.getBoundingClientRect().right > window.innerWidth) {
			posVar.value = { right: '0px', left: 'unset' }
		}
		// 如果检测到下方空间不够 那就移动到上面 如果空间不足则不移动
		if (pollUpEl.value.getBoundingClientRect().bottom > window.innerHeight) {
			posVar.value = { bottom: '50px', top: 'unset' }
		}
	}
}

const initPos = () => {
	if (pollUpEl.value) {
		switch (props.fixPos) {
			case 'upcenter':
				posVar.value = { bottom: '50px', top: 'unset', left: 'unset', right: 'unset', transform: 'translateX(-50%)' }
				break
			case 'downcenter':
				posVar.value = { bottom: 'unset', top: '50px', left: 'unset', right: 'unset', transform: 'translateX(-50%)' }
				break
			case 'downleft':
				posVar.value = { bottom: 'unset', top: '50px', left: '0', right: 'unset' }
				break
			case 'downright':
				posVar.value = { bottom: 'unset', top: '50px', right: 'unset', left: '0' }
				break
			case 'upleft':
				posVar.value = { bottom: '50px', top: 'unset', right: '0', left: 'unset' }
				break
			case 'upright':
				posVar.value = { bottom: '50px', top: 'unset', left: '0', right: 'unset' }
				break
			default:
				break
		}
	}
}

//设置pollup弹出框的大小
const setSize = () => {
	if (pollUpEl.value) {
		if (props.customSize) {
			for (let key in sizeData[props.size]) {
				if (props.customSize[key]) pollUpEl.value.style.setProperty(`--${key}`, props.customSize[key])
				else pollUpEl.value.style.setProperty(`--${key}`, sizeData[props.size][key])
			}
		} else {
			for (let key in sizeData[props.size]) {
				pollUpEl.value.style.setProperty(`--${key}`, sizeData[props.size][key])
			}
		}
	}
}

// 设置主题
const setTheme = () => {
	if (pollUpEl.value) {
		if (props.customTheme) {
			for (let key in themeData[props.theme]) {
				if (props.customTheme[key]) pollUpEl.value.style.setProperty(`--${key}`, props.customTheme[key])
				else pollUpEl.value.style.setProperty(`--${key}`, themeData[props.theme][key])
			}
		} else {
			for (let key in themeData[props.theme]) {
				pollUpEl.value.style.setProperty(`--${key}`, themeData[props.theme][key])
			}
		}
	}
}

// props改变了 就进行重新渲染
initPollup()

watchEffect(() => {
	setSize()
	setTheme()
})

onMounted(() => {
	setSize()
	setTheme()
	initPos()
	observe.value = new IntersectionObserver(entries => {
		entries.forEach(
			entry => {
				console.log(entry)
				changePos()
			},
			{ threshold: 0.3 }
		)
	})
	if (pollUpEl.value) {
		observe.value.observe(pollUpEl.value)
	}
})

onBeforeUnmount(() => {
	if (pollUpEl.value) {
		observe.value?.disconnect()
	}
})
</script>

<style lang="scss">
@import '../assets/styles/V3Emoji.scss';
$padding: 10px;
.pollup {
	width: $width;
	height: $height;
	position: absolute;
	right: 0;
	bottom: 50px;
	z-index: 5;
	transition: all ease 0.3s;
	color: $fontColor;
	background-color: $backgroundColor;
	box-shadow: 3px 3px 10px $shadowColor;
	border-radius: 15px;
	overflow: hidden;
	.tab-name {
		font-size: $fontsize;
		height: $itemsize;
		margin: 5px 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.delete-recent {
			color: rgb(49, 190, 255);
			cursor: pointer;
		}
	}
	.emoji-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, calc(var(--V3Emoji-itemSize) + 2 * $padding));
		justify-content: space-between;
		align-items: center;
		max-height: calc(var(--V3Emoji-height) - $itemsize * 2 - 2 * $padding - 10px); //计算出最大高度 根据tabname以及tab
		overflow-y: auto;
		&-item {
			padding: $padding;
			font-size: $fontsize;
			line-height: $itemsize;
			text-align: center;
			cursor: pointer;
			&:hover {
				background-color: $hoverColor;
			}
		}
	}
	.tab-container {
		position: absolute;
		width: 100%;
		height: calc(var(--V3Emoji-itemsize) + 2 * $padding);
		overflow: auto;
		bottom: 0;
		display: flex;
		background-color: $backgroundColor;
		box-shadow: 3px 3px 10px $shadowColor;
		.tab-item {
			padding: $padding;
			font-size: $fontsize;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			&.active {
				background-color: $activeColor;
			}
		}
	}
}
</style>
