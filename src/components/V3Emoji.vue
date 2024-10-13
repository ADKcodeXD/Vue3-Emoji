<template>
	<div :id="$style['EmojiItem']" :class="$style['emoji-item']" ref="EmojiEl">
		<div :class="$style['emoji-container']">
			<div :class="$style['emoji-container-open-btn']" ref="pollUpElTrigger" @click="toggleTippy">
				<slot>😀</slot>
			</div>
			<div ref="pollUpEl" style="display: none">
				<PollUp
					@click-emoji="clickEmoji"
					:size="size"
					:theme="theme"
					:skin="skin"
					:disableGroup="disableGroup"
					:optionsName="optionsName"
					:unicode-version="unicodeVersion"
					:need-local="recent"
					:defaultSelect="defaultSelect"
					:fulldata="fulldata"
					:customSize="customSize"
					:customIcon="customIcon"
					:customTab="customTab"
					:customTheme="customTheme"
					:key="2"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import '../assets/styles/V3Emoji.scss'
import { Emoji } from '../types/type'
import PollUp from './PollUp.vue'
import tippy from 'tippy.js'
import 'tippy.js/animations/scale.css' // 添加这行来导入 scale 动画
import { onMounted, onUnmounted, ref, watch } from 'vue'

const emit = defineEmits(['clickEmoji', 'close', 'update:modelValue', 'changeText'])

const props = withDefaults(
	defineProps<{
		size?: 'mid' | 'small' | 'big' //大小选项
		disableGroup?: string[] //用于禁用部分组的 如果不需要自带的几个组 那就传进来
		unicodeVersion?: number //用于unicode版本选择 部分设备无法兼容高版本的emojiunicode选项
		optionsName?: Emoji.JsonData //用于重置板块名字
		theme?: 'dark' | 'default' //支持暗黑或者亮色主题
		skin?: 'dark' | 'middark' | 'mid' | 'midlight' | 'light' | 'none' //用于设置emoji的肤色设置
		recent?: boolean //是否需要最近使用过的emoji
		defaultSelect?: string //默认选中某个板块
		fulldata?: boolean //是否将整个emoji发送出去
		keep?: boolean //是否需要保持上次浏览的位置
		customSize?: Emoji.CustomSize //自定义大小
		customTheme?: Emoji.CustomTheme //自定义主题
		customIcon?: Emoji.CustomIcon //自定义图标
		customTab?: Emoji.ObjectItem //支持自定义选择部分emoji单独设置一个板块
		fixPos?: string //固定位置 如果固定了位置 那么表情框只会在固定的位置 并不会随着页面的变化而改变位置
		manualClose?: boolean // 是否手动关闭
		tippyOptions?: any // tippy的配置项
	}>(),
	{
		size: 'mid',
		unicodeVersion: 11,
		theme: 'default',
		skin: 'none',
		recent: false,
		defaultSelect: 'Smileys & Emotion',
		fulldata: false,
		keep: false,
		manualClose: false,
		optionsName: () => {
			return {}
		},
		disableGroup: () => []
	}
)

const EmojiEl = ref()
const pollUpElTrigger = ref()
const pollUpEl = ref()
const tippyInstance = ref()
const isOpen = ref(false)

const clickEmoji = (emoji: Emoji.EmojiItem) => {
	emit('clickEmoji', props.fulldata ? emoji : emoji.emoji)
}

const toggleTippy = () => {
	if (isOpen.value) {
		closePop()
	} else {
		openPop()
	}
}

const openPop = () => {
	tippyInstance.value?.show()
	isOpen.value = true
}

const closePop = () => {
	if (props.manualClose) return
	tippyInstance.value?.hide()
	isOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
	if (isOpen.value && !EmojiEl.value.contains(event.target)) {
		closePop()
	}
}

onMounted(() => {
	document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
	document.removeEventListener('click', handleClickOutside)
})

watch(
	() => pollUpElTrigger.value,
	() => {
		const options: any = {
			placement: props.fixPos || 'bottom-end',
			arrow: false,
			duration: 200,
			allowHTML: true,
			content: document.getElementById('pollUpEl') || '',
			interactive: true,
			animation: 'scale',
			trigger: 'manual',
			onShow: () => {
				isOpen.value = true
			},
			onHide: () => {
				isOpen.value = false
			},
			...props.tippyOptions
		}
		if (pollUpElTrigger.value && document.getElementById('pollUpEl')) {
			tippyInstance.value = tippy(pollUpElTrigger.value, options)
		}
	},
	{ immediate: true }
)

defineExpose({
	closePop,
	openPop
})
</script>

<style lang="scss" module>
@import '../assets/styles/V3Emoji.scss';

.emoji-container {
  position: relative;
  display: inline-flex;
}

.emoji-container-open-btn {
  font-size: 20px;
  cursor: pointer;
}

.emoji-item {
  width: 100%;
  height: 100%;
}

.emoji-textarea {
  position: relative;
  width: 100%;
  height: 100%;
  
  textarea {
    width: 100%;
    height: 100%;
    padding: 8px;
    box-sizing: border-box;
    border-radius: 8px;
    font-size: $fontsize;
    line-height: 24px;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
    border: 1px solid $borderColor;
    outline: none;
    
    &:focus {
      border: 1px solid $borderFocusColor;
    }
  }
}

.emoji-textarea-pollup-container {
  font-size: 20px;
  position: absolute;
  bottom: 12px;
  right: 5px;
  z-index: 2;
}

.emoji-textarea-open-btn {
  cursor: pointer;
}

.emoji-input {
  position: relative;
  width: 100%;
  
  input {
    width: 100%;
    line-height: 24px;
    border-radius: 8px;
    font-size: $fontsize;
    outline: none;
    border: 1px solid $borderColor;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
    
    &:focus {
      border: 1px solid $borderFocusColor;
    }
  }
}

.emoji-textarea-pollup-container {
  font-size: 20px;
  position: absolute;
  right: 0;
  z-index: 2;
}
</style>
