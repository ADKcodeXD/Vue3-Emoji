<template>
  <div id="EmojiItem" class="emoji-item" ref="EmojiEl">
    <div class="emoji-container" v-if="!textArea">
      <div class="emoji-container-open-btn" @click="isPollupShow = !isPollupShow">
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
        :customTheme="customTheme"
      />
    </div>
    <div class="emoji-textarea" v-else>
      <textarea
        v-model="textValue"
        ref="textarea"
        :placeholder="textAreaOption.placeholder"
        :rows="textAreaOption.rows"
        :cols="textAreaOption.cols"
        :style="{ resize: textAreaOption.resize }"
      ></textarea>
      <div class="emoji-textarea-pollup-container">
        <div @click="isPollupShow = !isPollupShow" class="emoji-textarea-open-btn">
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
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import '../assets/styles/V3Emoji.scss';
import PollUp from './PollUp.vue';
const emit = defineEmits(['clickEmoji', 'close', 'update:modelValue', 'changeText']);
const props = withDefaults(
  defineProps<{
    size?: 'mid' | 'small' | 'big'; //大小选项
    disableGroup?: string[]; //用于禁用部分组的 如果不需要自带的几个组 那就传进来
    unicodeVersion?: number; //用于unicode版本选择 部分设备无法兼容高版本的emojiunicode选项
    optionsName?: Emoji.JsonData; //用于重置板块名字
    theme?: 'dark' | 'default'; //支持暗黑或者亮色主题
    skin?: 'dark' | 'middark' | 'mid' | 'midlight' | 'light' | 'none'; //用于设置emoji的肤色设置
    recent?: boolean; //是否需要最近使用过的emoji
    defaultSelect?: string; //默认选中某个板块
    fulldata?: boolean; //是否将整个emoji发送出去
    textArea?: boolean; //是否需要文本框
    textAreaOption?: Emoji.TextAreaOptions; //文本框的配置项
    keep?: boolean; //是否需要保持上次浏览的位置
    modelValue?: string; //文本框的值
    customSize?: Emoji.CustomSize; //自定义大小
    customTheme?: Emoji.CustomTheme; //自定义主题
    customIcon?: Emoji.CustomIcon; //自定义图标
    customTab?: Emoji.ObjectItem; //支持自定义选择部分emoji单独设置一个板块
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
    optionsName: () => {
      return {};
    },
    disableGroup: () => [],
    textAreaOption: () => {
      return {
        placeholder: '请输入文字',
        rows: 5,
        cols: 30,
        resize: 'none'
      };
    }
  }
);
const textValue = ref(props.modelValue);
const EmojiEl = ref();
const textarea = ref();
const start = ref(0); //记录光标的位置
const end = ref(0); //记录光标的位置
const isPollupShow = ref(false);
const textAreaClickOutSide = (e: any) => {
  let elment = e.target;
  if (!elment) return false;
  else {
    while (elment.className && elment.className !== 'pollup') {
      elment = elment.parentNode;
    }
    if (elment.className && elment.className === 'pollup') {
      return false;
    } else {
      return true;
    }
  }
};
const clickOutSide = (e: MouseEvent) => {
  if (!EmojiEl.value?.contains(e.target as HTMLElement) && textAreaClickOutSide(e)) {
    isPollupShow.value = false;
    emit('close');
  }
};
const clickEmoji = (emoji: Emoji.EmojiItem) => {
  if (props.textArea) {
    if (textarea.value) {
      let front = textValue.value.substring(0, start.value);
      let rear = textValue.value.substring(end.value, textValue.value.length);
      textValue.value = front + emoji.emoji + rear;
      start.value = front.length + emoji.emoji.length;
      end.value = front.length + emoji.emoji.length;
    }
  }
  emit('clickEmoji', props.fulldata ? emoji : emoji.emoji);
};
const recordCursor = (focus: boolean) => {
  if (props.textArea && textarea.value) {
    start.value = textarea.value.selectionStart;
    end.value = textarea.value.selectionEnd;
  }
  focus ? (isPollupShow.value = false) : '';
};
watchEffect(() => {
  emit('update:modelValue', textValue.value);
  emit('changeText', textValue.value);
});
watch(props, val => {
  textValue.value = props.modelValue;
});
onMounted(() => {
  document.addEventListener('click', clickOutSide);
  if (props.textArea) {
    textarea.value?.addEventListener('blur', recordCursor);
    textarea.value?.addEventListener('focus', recordCursor);
  }
});
onBeforeUnmount(() => {
  document.removeEventListener('click', clickOutSide);
  if (props.textArea) {
    textarea.value?.removeEventListener('blur', recordCursor);
    textarea.value?.removeEventListener('focus', recordCursor);
  }
});
</script>

<style lang="scss">
.emoji-container {
  position: relative;
  display: inline-flex;
  &-open-btn {
    font-size: 20px;
    cursor: pointer;
  }
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
    font-size: 16px;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
  }
  .emoji-textarea-pollup-container {
    font-size: 20px;
    position: absolute;
    bottom: 12px;
    right: 5px;
    z-index: 2;
    .emoji-textarea-open-btn {
      cursor: pointer;
    }
  }
}
</style>
