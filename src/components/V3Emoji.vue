<template>
  <div class="emoji-container" ref="EmojiEl">
    <div class="emoji-container-open-btn" @click="isPollupShow = !isPollupShow">
      <slot>😀</slot>
    </div>
    <PollUp
      v-if="isPollupShow"
      @click-emoji="(val:string) => emit('clickEmoji', val)"
      :size="size"
      :theme="theme"
      :skin="skin"
      :disableGroup="disableGroup"
      :optionsName="optionsName"
      :unicode-version="unicodeVersion"
      :need-local="recent"
    />
  </div>
</template>
<script setup lang="ts">
import '../assets/styles/V3Emoji.scss';
import PollUp from './PollUp.vue';
const emit = defineEmits(['clickEmoji', 'close']);
withDefaults(
  defineProps<{
    size?: 'mid' | 'small' | 'big'; //大小选项
    disableGroup?: string[]; //用于禁用部分组的 如果不需要自带的几个组 那就传进来
    unicodeVersion?: number; //用于unicode版本选择 部分设备无法兼容高版本的emojiunicode选项
    customTab?: Emoji.CustomItem[]; //支持自定义选择部分emoji单独设置一个板块 TODO
    optionsName?: Emoji.JsonData; //用于重置板块名字
    theme?: 'dark' | 'default'; //支持暗黑或者亮色主题
    skin?: 'dark' | 'middark' | 'mid' | 'midlight' | 'light' | 'none'; //用于设置emoji的肤色设置
    recent?: boolean;
  }>(),
  {
    size: 'mid',
    disableGroup: () => [],
    unicodeVersion: 11,
    theme: 'default',
    skin: 'none',
    recent: false,
    optionsName: () => {
      return {};
    }
  }
);
const EmojiEl = ref();
const isPollupShow = ref(false);
const clickOutSize = (e: MouseEvent) => {
  if (!EmojiEl.value?.contains(e.target as Node)) {
    isPollupShow.value = false;
    emit('close');
  }
};
onMounted(() => {
  document.addEventListener('click', clickOutSize);
});
onBeforeUnmount(() => {
  document.removeEventListener('click', clickOutSize);
});
</script>

<style lang="scss" scoped>
.emoji-container {
  position: relative;
  display: inline-flex;
  &-open-btn {
    font-size: 20px;
    cursor: pointer;
  }
}
</style>
