<template>
  <div class="emoji-container">
    <div class="emoji-container-open-btn" @click="isPollupShow = !isPollupShow">
      <slot>😀</slot>
    </div>
    <PollUp
      v-if="isPollupShow"
      @click-emoji="(val:string) => emit('clickEmoji', val)"
      :size="size"
      :theme="theme"
    />
  </div>
</template>
<script setup lang="ts">
import '../assets/styles/V3Emoji.scss';
import PollUp from './PollUp.vue';
const emit = defineEmits(['clickEmoji']);
const props = withDefaults(
  defineProps<{
    size?: string; //大小选项
    disableGroup?: string[]; //用于禁用部分组的 如果不需要自带的几个组 那就传进来
    unicodeVersion?: number; //用于unicode版本选择 部分设备无法兼容高版本的emojiunicode选项
    customTab?: Emoji.CustomItem[]; //支持自定义选择部分emoji单独设置一个板块
    options?: Emoji.ObjectItem; //用于重置板块名字
    theme?: 'dark' | 'default';
  }>(),
  {
    size: 'small',
    disableGroup: () => [],
    unicodeVersion: 11,
    theme: 'dark'
  }
);
provide('disableGroup', props.disableGroup);
const isPollupShow = ref(false);
</script>

<style lang="scss" scoped>
.emoji-container {
  position: relative;
  &-open-btn {
    font-size: 20px;
    cursor: pointer;
  }
}
</style>
