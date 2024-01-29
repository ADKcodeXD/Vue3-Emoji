<template>
	<div :class="styles['pollup']" ref="pollUpEl" :style="posVar">
		<div :class="styles['tab-name']" v-if="activeTab === 'recent'">
			<p sytle="margin:0 5px;">最近使用</p>
			<a :class="styles['delete-recent']" @click="deleteRecent">删除所有选项</a>
		</div>
		<p :class="styles['tab-name']" v-else>{{ activeTab }}</p>
		<div :class="styles['emoji-container']" ref="container">
			<template v-if="activeTab === 'recent'">
				<div
					:class="styles['emoji-container-item']"
					v-for="(emoji, index) in recentDataArr"
					:key="index"
					@click="clickEmoji(emoji)"
					:title="emoji.name"
					v-html="emojiSkin(emoji)"
				></div>
			</template>

			<template v-else>
				<div
					:class="styles['emoji-container-item']"
					v-for="(emoji, index) in renderData[activeTab]"
					:key="index"
					@click="clickEmoji(emoji)"
					:title="emoji.name"
					v-html="emojiSkin(emoji)"
				></div>
			</template>
		</div>
		<div :class="styles['tab-container']" ref="tabcontainer">
			<!-- 最近使用过的的选项 -->
			<div :class="[styles['tab-item'], activeTab === 'recent' ? styles['active'] : '']" v-if="needLocal" @click="changeTab('recent')">
				🔥
			</div>
			<div
				:class="[styles['tab-item'], tab === activeTab ? styles['active'] : '']"
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
import styles from './PollUp.module.scss'
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
const groupName: string[] = []

const activeTab = ref('Smileys & Emotion')
const pollUpEl = ref<HTMLElement>()
const observe = ref<ResizeObserver>()
const renderData = filterData(emojiData, props.optionsName, props.unicodeVersion, props.disableGroup, props.customTab)
const recentData = ref<Emoji.ObjectItem>(getItem('emoji-recent') || null)
const posVar = ref({})
const tabcontainer = ref()
const container = ref()

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

const changePos = () => {
	if (pollUpEl.value) {
		const rect = pollUpEl.value.getBoundingClientRect()
		let newStyle = {}
		// 上方空间不够
		if (rect.top < 0) {
			newStyle = { bottom: 'unset', top: '50px' }
		}
		// 左边空间不够
		else if (rect.left < 0) {
			newStyle = { left: '0px', right: 'unset' }
		}
		// 右边空间不够
		else if (rect.right > window.innerWidth) {
			newStyle = { right: '0px', left: 'unset' }
		}
		// 下方空间不够
		else if (rect.bottom > window.innerHeight) {
			newStyle = { bottom: '50px', top: 'unset' }
		}
		posVar.value = Object.assign(pollUpEl.value.style, newStyle)
	}
}

const initPos = () => {
	if (pollUpEl.value) {
		const positions = {
			upcenter: { bottom: '50px', top: 'unset', left: '50%', right: 'unset', transform: 'translateX(-50%)' },
			downcenter: { bottom: 'unset', top: '50px', left: '50%', right: 'unset', transform: 'translateX(-50%)' },
			downleft: { bottom: 'unset', top: '50px', left: '0', right: 'unset' },
			downright: { bottom: 'unset', top: '50px', right: '0', left: 'unset' },
			upleft: { bottom: '50px', top: 'unset', right: 'unset', left: '0' },
			upright: { bottom: '50px', top: 'unset', left: 'unset', right: '0' }
		}
		posVar.value = positions[props.fixPos || 'upleft'] || {}
	}
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
			container.value.style['max-height'] = `${_height}px`
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

watchEffect(() => {
	initPollup()
	setSize()
	setTheme()
})

onMounted(() => {
	setSize()
	setTheme()
	initPos()
	observe.value = new IntersectionObserver(entries => {
		entries.forEach(changePos, { threshold: 0.3 })
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
