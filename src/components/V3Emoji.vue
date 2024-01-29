<template>
	<div id="EmojiItem" :class="styles['emoji-item']" ref="EmojiEl">
		<div :class="styles['emoji-container']" v-if="!textArea">
			<div :class="styles['emoji-container-open-btn']" @click="isPollupShow = !isPollupShow">
				<slot>😀</slot>
			</div>
			<PollUp
				v-if="(isPollupShow && !textArea) || keep"
				v-show="keep ? isPollupShow : true"
				@click-emoji="clickEmoji"
				:size="size"
				ref="pollUpEl"
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
				:fixPos="fixPos"
				:customTheme="customTheme"
			/>
		</div>
		<div :class="styles['emoji-textarea']" v-else-if="inputType === 'textarea'">
			<textarea
				v-model="textValue"
				ref="textarea"
				:placeholder="textAreaOption.placeholder"
				:rows="textAreaOption.rows"
				:cols="textAreaOption.cols"
				@blur="recordCursor"
				@focus="recordCursor"
				:style="{ resize: textAreaOption.resize }"
			></textarea>
			<div :class="styles['emoji-textarea-pollup-container']">
				<div @click="isPollupShow = !isPollupShow" :class="styles['emoji-textarea-open-btn']">
					<slot>😀</slot>
				</div>
				<PollUp
					v-if="(isPollupShow && textArea) || keep"
					v-show="keep ? isPollupShow : true"
					@click-emoji="clickEmoji"
					:size="size"
					:theme="theme"
					:skin="skin"
					:disableGroup="disableGroup"
					:optionsName="optionsName"
					:unicode-version="unicodeVersion"
					:need-local="recent"
					:defaultSelect="defaultSelect"
					:customSize="customSize"
					:customIcon="customIcon"
					:customTheme="customTheme"
					:customTab="customTab"
					:fixPos="fixPos"
				/>
			</div>
		</div>
		<div :class="styles['emoji-input']" v-else>
			<input v-model="textValue" ref="inputArea" :placeholder="textAreaOption.placeholder" @blur="recordCursor" @focus="recordCursor" />
			<div :class="styles['emoji-textarea-pollup-container']">
				<div @click="isPollupShow = !isPollupShow" :class="styles['emoji-textarea-open-btn']">
					<slot>😀</slot>
				</div>
				<PollUp
					v-if="(isPollupShow && textArea) || keep"
					v-show="keep ? isPollupShow : true"
					@click-emoji="clickEmoji"
					:size="size"
					:theme="theme"
					:skin="skin"
					:disableGroup="disableGroup"
					:optionsName="optionsName"
					:unicode-version="unicodeVersion"
					:need-local="recent"
					:defaultSelect="defaultSelect"
					:customSize="customSize"
					:customIcon="customIcon"
					:customTheme="customTheme"
					:customTab="customTab"
					:fixPos="fixPos"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import '../assets/styles/V3Emoji.scss'
import styles from './V3Emoji.module.scss'
import { Emoji } from '../types/type'
import PollUp from './PollUp.vue'

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
		textArea?: boolean //是否需要文本框
		inputType?: 'textarea' | 'input' // 自带文本框的类型
		textAreaOption?: Emoji.TextAreaOptions //文本框的配置项
		keep?: boolean //是否需要保持上次浏览的位置
		modelValue?: string //文本框的值
		customSize?: Emoji.CustomSize //自定义大小
		customTheme?: Emoji.CustomTheme //自定义主题
		customIcon?: Emoji.CustomIcon //自定义图标
		customTab?: Emoji.ObjectItem //支持自定义选择部分emoji单独设置一个板块
		fixPos?: Emoji.FixType //固定位置 如果固定了位置 那么表情框只会在固定的位置 并不会随着页面的变化而改变位置
		manualClose?: boolean // 是否手动关闭
	}>(),
	{
		size: 'mid',
		unicodeVersion: 11,
		theme: 'default',
		skin: 'none',
		recent: false,
		defaultSelect: 'Smileys & Emotion',
		fulldata: false,
		textArea: false,
		modelValue: '',
		keep: false,
		inputType: 'textarea',
		manualClose: false,
		optionsName: () => {
			return {}
		},
		disableGroup: () => [],
		textAreaOption: () => {
			return {
				placeholder: '请输入文字',
				rows: 5,
				cols: 30,
				resize: 'none'
			}
		}
	}
)

const textValue = ref(props.modelValue)
const EmojiEl = ref()
const textarea = ref()
const inputArea = ref()
const start = ref(0) //记录光标的位置
const end = ref(0) //记录光标的位置
const isPollupShow = ref(false)

const textAreaClickOutSide = (e: any) => {
	let elment = e.target
	if (!elment) return false
	else {
		while (elment.className && elment.className !== 'pollup') {
			elment = elment.parentNode
		}
		if (elment.className && elment.className === 'pollup') {
			return false
		} else {
			return true
		}
	}
}

const clickOutSide = (e: MouseEvent) => {
	if (props.manualClose) {
		return
	} else if (!EmojiEl.value?.contains(e.target as HTMLElement) && textAreaClickOutSide(e)) {
		isPollupShow.value = false
		emit('close')
	}
}

const closePop = () => {
	isPollupShow.value = false
}

const clickEmoji = (emoji: Emoji.EmojiItem) => {
	if (props.textArea) {
		let front = textValue.value.substring(0, start.value)
		let rear = textValue.value.substring(end.value, textValue.value.length)
		textValue.value = front + emoji.emoji + rear
		start.value = front.length + emoji.emoji.length
		end.value = front.length + emoji.emoji.length
	}
	emit('clickEmoji', props.fulldata ? emoji : emoji.emoji)
}

const recordCursor = (focus: any) => {
	if (props.textArea) {
		if (props.inputType === 'textarea') {
			start.value = textarea.value.selectionStart
			end.value = textarea.value.selectionEnd
		} else {
			start.value = inputArea.value.selectionStart
			end.value = inputArea.value.selectionEnd
		}
	}
	focus && !props.manualClose ? (isPollupShow.value = false) : ''
}

defineExpose({
	closePop
})

watchEffect(() => {
	emit('update:modelValue', textValue.value)
	emit('changeText', textValue.value)
})

watch(props, val => {
	textValue.value = props.modelValue
})

onMounted(() => {
	document.addEventListener('click', clickOutSide)
})

onBeforeUnmount(() => {
	document.removeEventListener('click', clickOutSide)
})
</script>
